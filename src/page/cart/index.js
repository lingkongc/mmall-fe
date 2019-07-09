/*
 * @Author: Asling
 * @Date:   2019-07-07 20:49:48
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-08 16:45:02
 */
'use strict';

require('./index.css');
require('../../page/common/header/index.js');
var nav = require('../../page/common/nav/index.js');
var _mm = require('../../util/mm.js');
var _cart = require('../../service/cart-server.js');
var templateIndex = require('./index.string');

var page = {
    data: {},
    init: function() {
        this.onLoad();
        this.bindEvnet();
    },
    onLoad: function() {
        this.loadCart();
    },
    bindEvnet: function() {
        var _this = this;
        // 商品选择
        $(document).on('click', '.cart-select', function() {
            var $this = $(this),
                productId = $this.parents('.cart-table').attr('data-product-id');
            // 切换选中状态
            if ($this.is(':checked')) {
                _cart.selectProduct(productId, function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartError();
                });
            } else {
                _cart.unselectProduct(productId, function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartError();
                });
            }
        });
        // 商品的全选和取消全选
        $(document).on('click', '.cart-select-all', function() {
            var $this = $(this);
            // 切换选中状态
            if ($this.is(':checked')) {
                _cart.selectAllProduct(function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartError();
                });
            } else {

                _cart.unselectAllProduct(function(res) {

                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showCartError();
                });
            }
        });
        // 改变商品数量
        $(document).on('click', '.count-btn', function() {
            var $this = $(this),
                $pCount = $this.siblings('.count-input'),
                currCount = parseInt($pCount.val()),
                type = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                minCouunt = 1,
                maxCount = parseInt($pCount.data('max')),
                newCount = 0;
            if (type === 'plus') {
                if (currCount >= maxCount) {
                    _mm.errorTips('该商品数量已达到上限');
                    return;
                }
                newCount = currCount + 1;
            } else if (type === 'minus') {
                if (currCount <= minCouunt) {
                    return;
                }
                newCount = currCount - 1;
            }
            _cart.updateProduct({
                productId: productId,
                count: newCount
            }, function(res) {
                _this.renderCart(res);
            }, function(errMsg) {
                _this.showCartError();
            });
        });
        // 删除单个商品
        $(document).on('click', '.cart-delete', function() {
            if (window.confirm('确认要删除该商品么？')) {
                var productId = $(this).parents('.cart-table').data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        // 删除选中商品
        $(document).on('click', '.delete-selected', function() {
            if (window.confirm('确认要删除选中的商品么？')) {
                var arrProductIds = [],
                    $selectedItem = $('.cart-select:checked');
                for (var i = 0, iLenght = $selectedItem.length; i < iLenght; i++) {
                    var productId = $($selectedItem[i]).parents('.cart-table').data('product-id');
                    arrProductIds.push(productId);
                }
                if (arrProductIds.length) {
                    _this.deleteCartProduct(arrProductIds.join(','));
                } else {
                    _mm.errorTips('您还没有选中要删除的商品');
                }
            }
        });
        // 提交购物车
        $(document).on('click', '.btn-submit', function() {
            // 总价大于0进行提交
            if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
                window.location.href = './order-confirm.html';
            } else {
                _mm.errorTips('请选择商品后再进行提交');
            }
        });

    },
    loadCart: function() {
        var _this = this;
        // 获取购物车列表
        _cart.getCartList(function(res) {
            _this.renderCart(res);
        }, function(errMsg) {
            _this.showCartError();
        });
    },
    renderCart: function(data) {
        this.filter(data);
        // 缓存数据
        this.data.cartInfo = data;
        var cartHtml = _mm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
        // 更新导航
        nav.loadCartCount();
    },
    // 删除指定商品,支持多个，用逗号分隔
    deleteCartProduct: function(productIds) {
        var _this = this;
        _cart.deleteProduct(productIds, function(res) {
            _this.renderCart(res);
        }, function(errMsg) {
            _this.showCartError();
        })
    },
    filter: function(data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },
    showCartError: function() {
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>');
    }
}

$(function() {
    page.init();
})
/*
 * @Author: Asling
 * @Date:   2019-07-08 16:45:36
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-09 20:29:46
 */

'use strict';

require('./index.css');
require('../../page/common/header/index.js');
require('../../page/common/nav/index.js');
var _mm = require('../../util/mm.js');
var _order = require('../../service/order-server.js');
var _address = require('../../service/address-server.js');
var templateProduct = require('./product-list.string');
var templateAddress = require('./address-list.string');
var addressModal = require('./address-modal.js');

var page = {
    data: {
        selectedAddressId: null,

    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent: function() {
        var _this = this;

        // 地址的选择
        $(document).on('click', '.address-item', function() {
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });
        // 订单提交
        $(document).on('click', 'order-submit', function() {
            var shippingId = _this.data.selectedAddressId;
            if (shippingId) {
                _order.createOrder({
                    shippingId: shippingId
                }, function(res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                })
            } else {
                _mm.errorTips('<p>请选择地址后再提交</p>')
            }
        });
        $(document).on('click', '.address-add', function() {
            addressModal.show({
                isUpdate: false,
                onSuccess: function() {
                    _this.loadAddressList();
                }
            });
        });
        // 地址编辑
        $(document).on('click', '.address-update', function(event) {
            event.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function(res) {
                addressModal.show({
                    isUpdate: true,
                    data: res,
                    onSuccess: function() {
                        _this.loadAddressList();
                    }
                });
            }, function(errMsg) {
                _mm.errorTips(errMsg);
            })
        });
        // 删除地址
        $(document).on('click', '.address-delete', function(event) {
            event.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            if (window.confirm('确认要删除该地址么？')) {
                _address.deleteAddress(shippingId, function(res) {
                    _this.loadAddressList();
                }, function(errMsg) {
                    _mm.errorTips(errMsg)
                })
            } else {

            }
        })
    },
    loadAddressList: function() {
        var _this = this;
        $('.address-container').html('<div class="loading"></div>')

        _address.getAddressList(function(res) {
            _this.addressFilter(res);
            var addressListHtml = _mm.renderHtml(templateAddress, res);
            $('.address-container').html(addressListHtml);
        }, function(errMsg) {
            $('.address-container').html('<p>地址加载失败，请刷新后重试。</p>')
        })
    },
    // 处理地址列表中选中状态
    addressFilter: function(data) {
        if (this.data.selectedAddressId) {
            var selectedAddressIdFlag = false;
            for (var i = 0, length = data.list.length; i < length; i++) {
                if (data.list[i].id === this.data.selectedAddressId) {
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            };
            // 如果以前选中的地址不在列表中，将其删除
            if (selectedAddressIdFlag) {
                this.data.selectedAddressId = null;
            }
        }
    },
    loadProductList: function() {
        var _this = this;
        $('.product-container').html('<div class="loading"></div>')
        _order.getProductList(function(res) {
            var productListHtml = _mm.renderHtml(templateProduct, res);
            $('.product-container').html(productListHtml);
        }, function(errMsg) {
            $('.product-container').html('<p>商品信息加载失败，请刷新后重试。</p>')
        })
    }
};
$(function() {
    page.init();
});
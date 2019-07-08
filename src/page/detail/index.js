/*
 * @Author: Asling
 * @Date:   2019-07-07 10:25:44
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-08 08:14:14
 */
'use strict';

require('./index.css');
require('../../page/common/nav/index.js');
require('../../page/common/header/index.js');
var _mm = require('../../util/mm.js');
var _product = require('../../service/product-server.js');
var _cart = require('../../service/cart-server.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        productId: _mm.getUrlParam('productId') || '',
    },
    init: function() {
        this.onLoad();
        this.bindEvnet();
    },
    onLoad: function() {
        // 如果没有获取到product 自动跳回首页
        if (!this.data.productId) {
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvnet: function() {
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function() {
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        // count操作
        $(document).on('click', '.p-count-btn', function() {
            var type = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount = $('.p-count'),
                currCont = parseInt($pCount.val()),
                minCount = 1,
                maxCount = _this.data.detailInfo.stock || 1;
            if (type === 'plus') {
                $pCount.val((currCont < maxCount) ? (currCont + 1) : maxCount)
            } else if (type === 'minus') {
                $pCount.val((currCont > minCount) ? (currCont - 1) : minCount)
            }
        });
        $(document).on('click', '.cart-add', function() {
            _cart.addToCart({
                productId: _this.data.productId,
                count: $('.p-count').val()
            }, function(res) {
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg) {
                _mm.errorTips(errMsg);
            })
        })
    },
    loadDetail: function() {
        var _this = this,
            html = '',
            $pageWrap = $('.page-wrap');
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求detail信息
        _product.getProductDetail(this.data.productId, function(res) {
            // 对数据中的图片地址进行处理
            _this.filter(res);
            // 缓存数据到对象
            _this.data.detailInfo = res;
            html = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function(errMsg) {
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了。</p>')
        });
    },
    filter: function(data) {
        data.subImages = data.subImages.split(',');
    }
}

$(function() {
    page.init();
})
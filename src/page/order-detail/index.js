/*
 * @Author: Asling
 * @Date:   2019-07-10 11:06:01
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-10 15:35:13
 */

'use strict';
require('./index.css');
require('../../page/common/nav/index.js');
require('../../page/common/header/index.js');
var navSide = require('../../page/common/nav-side/index.js');

var _order = require('../../service/order-server.js');
var _mm = require('../../util/mm.js');
var templateIndex = require('./index.string');

// page逻辑
var page = {
    data: {
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function() {
        this.onload();
        this.bindEvent();
    },
    onload: function() {
        // 初始化左侧菜单
        navSide.init({ name: 'order-list' });
        this.loadDetail();
    },
    bindEvent: function() {
        var _this = this;
        $(document).on('click', '.order-cancel', function() {
            if (window.confirm('确实要取消该订单么？')) {
                _order.cancelOrder(_this.data.orderNumber, function(res) {
                    _mm.successTips('该订单取消成功');
                    _this.loadDetail();
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                });
            }
        });
    },
    // 加载订单列表
    loadDetail: function() {
        var orderDetailHtml = '',
            _this = this,
            $content = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber, function(res) {
            _this.dataFilter(res);
            orderDetailHtml = _mm.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
        }, function(errMsg) {
            $content.html('<p class="err-tip">' + errMsg + '</p>')
        })
    },
    dataFilter: function(data) {
        data.needPay = data.status == 10;
        data.isCancelable = data.status == 10;
    }
};

$(function() {
    page.init();
});
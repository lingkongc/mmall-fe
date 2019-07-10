/*
 * @Author: Asling
 * @Date:   2019-07-09 20:38:33
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-10 10:59:22
 */

'use strict';
require('./index.css');
require('../../page/common/nav/index.js');
require('../../page/common/header/index.js');
var navSide = require('../../page/common/nav-side/index.js');

var _order = require('../../service/order-server.js');
var _mm = require('../../util/mm.js');
var templateIndex = require('./index.string');
var Pagination = require('../../util/pagination/index.js');

// page逻辑
var page = {
    data: {
        listparam: {
            pageNum: 1,
            pageSize: 1,
        }
    },
    init: function() {
        this.onload();
    },
    onload: function() {
        this.loadOrderList();
        // 初始化左侧菜单
        navSide.init({ name: 'order-list' });

    },
    // 加载订单列表
    loadOrderList: function() {
        var orderListHtml = '',
            _this = this,
            $listContainer = $('.order-list-container');
        $listContainer.html('<div class="loading"></div>');
        _order.getOrderList(this.data.listparam, function(res) {
            orderListHtml = _mm.renderHtml(templateIndex, res);
            $listContainer.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function(errMsg) {
            $listContainer.html('<p class="err-tip">加载订单失败，请刷新后重试</p>')
        })
    },
    loadPagination: function(pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function(pageNum) {
                _this.data.listparam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};

$(function() {
    page.init();
});
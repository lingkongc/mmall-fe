/*
 * @Author: Asling
 * @Date:   2019-07-05 17:45:32
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-07 09:43:15
 */

'use strict';

require('./index.css');
require('../../page/common/nav/index.js');
require('../../page/common/header/index.js');
var _mm = require('../../util/mm.js');
var _product = require('../../service/product-server.js');
var Pagination = require('../../util/pagination/index.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        listParam: {
            keyword: _mm.getUrlParam('keyword') || '',
            categoryId: _mm.getUrlParam('categoryId') || '',
            orderBy: _mm.getUrlParam('orderBy') || 'default',
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 10
        }
    },
    init: function() {
        this.loadList();
        this.bindEvnet();
    },
    onLoad: function() {
        this.loadList();
    },
    bindEvnet: function() {
        var _this = this;
        // 排序点击
        $('.sort-item').click(function() {
            var $this = $(this)
            _this.data.listParam.pageNum = 1;
            // 点击默认排序&价格排序
            if ($this.data('type') === 'default') {
                if ($this.hasClass('active')) {
                    return;
                } else {
                    $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            } else if ($this.data('type') === 'price') {
                $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                // 升序降序
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc')
                    _this.data.listParam.orderBy = 'price_asc';
                } else {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载列表
            _this.loadList();
        });
    },
    loadList: function() {
        var listHtml = '',
            _this = this,
            listParam = this.data.listParam,
            $pListContainer = $('.p-list-container');

        $pListContainer.html('<div class="loading"></div>')
        // 删除不必要的字段
        listParam.categoryId ?
            (delete listParam.keyword) :
            (delete listParam.categoryId);
        // 请求接口
        _product.getProductList(listParam, function(res) {
            listHtml = _mm.renderHtml(templateIndex, {
                list: res.list
            });
            $pListContainer.html(listHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });

        }, function(errMsg) {
            _mm.errorTips(errMsg);
        })
    },
    // 加载分页
    loadPagination: function(pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function(pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));

    }
}

$(function() {
    page.init();
})


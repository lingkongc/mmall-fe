/*
 * @Author: Asling
 * @Date:   2019-07-06 09:44:13
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-07 09:33:07
 */

'use strict';

require('./index.css');
var templatePagination = require('./index.string');
var _mm = require('../../util/mm.js');


var Pagination = function() {
    var _this = this;
    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    };
    // 事件的处理
    $(document).on('click', '.pg-item', function() {
        var $this = $(this);
        // active和disabled按钮不做处理
        if ($this.hasClass('active') || $this.hasClass('disabled')) {
            return;
        }
        typeof _this.option.onSelectPage === 'function' ?
            _this.option.onSelectPage($this.data('value')) :
            null;
    });
};

Pagination.prototype.render = function(userOption) {
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断容器是否合法
    if (!(this.option.container instanceof jQuery)) {
        return;
    };
    // 判断是否只有一页 
    if (this.option.pages <= 1) {
        return;
    };
    this.option.container.html(this.getPaginationHtml())
}

// |上一页|1 2 3 4 =5= 6 |下一页| 5/6
Pagination.prototype.getPaginationHtml = function() {
    var option = this.option,
        html = '',
        pageArray = [];
    var start = (option.pageNum - option.pageRange) > 0 ?
        (option.pageNum - option.pageRange) : 1;
    var end = (option.pageNum + option.pageRange) < option.pages ?
        (option.pageNum + option.pageRange) : option.pages;
    // 上一页按钮的数据
    pageArray.push({
        name: '上一页',
        value: this.option.prePage,
        disabled: !option.hasPreviousPage
    });
    // 数字按钮处理
    for (var i = start; i <= end; i++) {
        pageArray.push({
            name: i,
            value: i,
            active: (i === option.pageNum)
        })
    };
    // 下一页按钮
    pageArray.push({
        name: '下一页',
        value: option.nextPage,
        disabled: !option.hasNextPage
    });
    html = _mm.renderHtml(templatePagination, {
        pageArray: pageArray,
        pageNum: option.pageNum,
        pages: option.pages
    });
    return html;
};

module.exports = Pagination;
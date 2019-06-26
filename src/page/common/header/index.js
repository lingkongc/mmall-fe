/*
 * @Author: lingkongc
 * @Date:   2019-06-26 19:33:55
 * @Last Modified by:   lingkongc
 * @Last Modified time: 2019-06-26 20:13:18
 */


'use strict';

require('./index.css');


var _mm = require('../../../util/mm.js');


// 通用页面头部
var header = {
    init: function() {
        this.bindEvent();
    },
    onload: function() {
        var keyword = _mm.getUrlParam('keyword');
        // keyword存在，回填输入框
        if (keyword) {
            $('#search-input').val(keyword);
        };
    },
    // 搜索提交
    searchSubmit: function() {
        var keyword = $.trim($('#search-input').val());
        // 如果提交的时候有keyword，跳转到list页面
        // 否则 返回首页
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            _mm.goHome();
        }
    },
    bindEvent: function() {
        var _this = this;
        // 点击按钮后提交搜索
        $('#search-btn').click(function() {
            _this.searchSubmit();
        });
        // 回车后搜索
        $('#search-input').keyup(function(event) {
            // 13是回车键
            if (event.keyCode === 13) {
                _this.searchSubmit();
            }
        })
    }
}

header.init();
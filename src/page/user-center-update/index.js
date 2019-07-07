/*
 * @Author: Asling
 * @Date:   2019-07-03 16:08:30
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-04 14:55:17
 */



'use strict';
require('./index.css');
require('../../page/common/nav/index.js');
require('../../page/common/header/index.js');
var _user = require('../../service/user-server.js');

var navSide = require('../../page/common/nav-side/index.js');
var _mm = require('../../util/mm.js');
var templateIndex = require('./index.string');

// page逻辑
var page = {
    init: function() {
        this.onload();
        this.bindEvent();
    },
    onload: function() {
        // 初始化左侧菜单
        navSide.init({ name: 'user-center' });
        // 加载用户信息
        this.loadUserInfo();
    },
    bindEvent: function(){

    },
    loadUserInfo: function() {
        var userHtml = '';
        _user.getUserInfo(function(res) {
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg) {
            _mm.errorTips(errMsg);
        });
    }
};

$(function() {
    page.init();
});
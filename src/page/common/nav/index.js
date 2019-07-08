/*
 * @Author: lingkongc
 * @Date:   2019-06-26 16:38:07
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-08 16:17:13
 */


'use strict';

require('./index.css');

var _mm = require('../../../util/mm.js');
var _user = require('../../../service/user-server.js');
var _cart = require('../../../service/cart-server.js');

// 导航
var nav = {
    init: function() {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent: function() {
        // 登录点击事件
        $('.js-login').click(function() {
            _mm.doLogin();
        });

        // 注册点击事件
        $('.js-register').click(function() {
            window.location.href = './user-register.html';
        });

        // 退出点击事件
        $('.js-logout').click(function() {
            _user.logout(function(res) {
                // 退出成功刷新页面
                window.location.reload();
            }, function(errMsg) {
                _mm.errorTips(errMsg);
            })
        });
    },
    // 加载用户信息
    loadUserInfo: function() {
        _user.checkLogin(function(res) {
            $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
        }, function(errMsg) {
            // do nothing
            console.log('false');
        });
    },
    // 加载购物车数量
    loadCartCount: function() {
        _cart.getCartCount(function(res) {
            $('.nav .cart-count').text(res || 0)
        }, function(errMsg) {
            $('.nav .cart-count').text(0)
        });
    }
}

module.exports = nav.init();
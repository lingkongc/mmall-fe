/*
 * @Author: Asling
 * @Date:   2019-07-03 16:08:30
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-07 09:47:41
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
    bindEvent: function() {
        var _this = this;
        // 点击提交表单 
        // 事件代理
        $(document).on('click', '.btn-submit', function() {
            var userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            };
            var validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                // 更改用户信息 发送ajax
                _user.updateUserInfo(userInfo, function(res) {
                    _mm.successTips(res.msg);
                    window.location.href = './user-center.html';
                }, function(errMsg) {
                    _mm.errorTips(validateResult.msg);
                });
            } else {
                _mm.errorTips(validateResult.msg);
            }
        })
    },
    loadUserInfo: function() {
        var userHtml = '';
        _user.getUserInfo(function(res) {
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg) {
            _mm.errorTips(errMsg);
        });
    },
    validateForm: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        // 验证注册手机号
        if (!_mm.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        };
        // 验证注册邮箱号
        if (!_mm.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        };
        // 验证注册问题
        if (!_mm.validate(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        };
        // 验证注册问题答案
        if (!_mm.validate(formData.answer, 'require')) {
            result.msg = '密码提示问题答案不能为空';
            return result;
        };

        // 通过验证
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};

$(function() {
    page.init();
});
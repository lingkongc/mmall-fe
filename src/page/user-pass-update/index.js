/*
 * @Author: Asling
 * @Date:   2019-07-04 17:53:12
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-04 20:02:25
 */


'use strict';
require('./index.css');
require('../../page/common/nav/index.js');
require('../../page/common/header/index.js');
var _user = require('../../service/user-server.js');

var navSide = require('../../page/common/nav-side/index.js');
var _mm = require('../../util/mm.js');


// page逻辑
var page = {
    init: function() {
        this.onload();
        this.bindEvent();
    },
    onload: function() {
        // 初始化左侧菜单
        navSide.init({ name: 'user-pass-update' });
    },
    bindEvent: function() {
        var _this = this;
        // 点击提交表单 
        // 事件代理
        $(document).on('click', '.btn-submit', function() {
            var userInfo = {
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val())
            };
            var validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                // 更改用户密码
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function(res) {
                    _mm.successTips(res);
                }, function(errMsg) {
                    _mm.errorTips(validateResult.msg);
                });
            } else {
                _mm.errorTips(validateResult.msg);
            }
        })
    },
    validateForm: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        // 验证原密码为空
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '原密码不能为空';
            return result;
        };
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '密码长度不得少于6位';
            return result;
        };
        // 验证两次输入密码是否一致
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
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
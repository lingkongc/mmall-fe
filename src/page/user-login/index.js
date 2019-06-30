/*
 * @Author: lingkongc
 * @Date:   2019-06-27 17:59:39
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-06-30 14:43:09
 */

'user strict';
require('../common/nav-simple/index.js');
require('./index.css');
var _mm = require('../../util/mm.js');
var _user = require('../../service/user-server.js');

// 表单错误提示
var toggleError = {
    show: function(errMsg) {
        $('.error-item').show().find('.error-msg').text(errMsg);
    },
    hied: function() {
        $('.error-item').show().find('.error-msg').text('');
    }
};

// page逻辑
var page = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        // 登录按钮点击
        $('#submit').click(function() {
            _this.submit();
        });
        // 回车提交表单
        $('.user-content').keyup(function(event) {
            if (event.keyCode === 13) {
                _this.submit();
            }
        })
    },
    // 提交表单
    submit: function() {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        // 表单验证结果
        validateResult = this.formValidate(formData);
        // 验证成功
        if (validateResult.status) {
            // 提交
            _user.login(formData, function(res) {
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function(errMsg) {
                toggleError.show(errMsg);
            });
        } else {
            toggleError.show(validateResult.msg);
        }
    },

    formValidate: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        };
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }

        // 通过验证
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};

$(function() {
    page.init();
});
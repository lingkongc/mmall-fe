/*
 * @Author: Asling
 * @Date:   2019-06-30 15:29:39
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-06-30 18:50:36
 */

'user strict';
require('../common/nav-simple/index.js');
require('./index.css');
var _mm = require('../../util/mm.js');
var _user = require('../../service/user-server.js');

// 表单错误提示
var formError = {
    show: function(errMsg) {
        $('.error-item').show().find('.error-msg').text(errMsg);
    },
    hide: function() {
        $('.error-item').hide().find('.error-msg').text('');
    }
};

// page逻辑
var page = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        // 验证username
        $('#username').blur(function() {
            var username = $.trim($(this).val());
            // 如果用户名不为空则进行验证
            if (username === '') return false;
            // 异步验证username是否存在
            _user.checkUsername(username, function(res) {
                formError.hide();
            }, function(errMsg) {
                formError.show(errMsg);
            })
        });

        // 注册按钮点击
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
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        };
        // 表单验证结果
        validateResult = this.formValidate(formData);
        // 验证成功
        if (validateResult.status) {
            // 提交
            _user.register(formData, function(res) {
                window.location.href = './result.html?type=register'
            }, function(errMsg) {
                formError.show(errMsg);
            });
        } else {
            formError.show(validateResult.msg);
        }
    },
    // 字段验证
    formValidate: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        // 验证登录用户名是否为空
        if (!_mm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        };
        // 验证登录密码是否为空
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        };
        // 验证注册密码长度
        if (formData.password.length <= 6) {
            result.msg = '密码长度不能低于6位';
            return result;
        };
        // 验证注册两次密码是否相同
        if (formData.password !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
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
/*
 * @Author: Asling
 * @Date:   2019-06-30 21:33:37
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-03 10:41:11
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
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function() {
        this.onload();
        this.bindEvent();
    },
    onload: function() {
        this.loadStepUsername();
    },
    bindEvent: function() {
        var _this = this;
        // 第一步 提交用户名
        $('#submit-username').click(function() {
            var username = $.trim($('#username').val());
            // 用户名是否存在
            if (username) {
                _user.getQuestion(username, function(res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入用户名');
            }
        });
        // 第二步 输入密码提示问题 点击
        $('#submit-question').click(function() {
            var answer = $.trim($('#answer').val());
            // 用户名是否存在
            if (answer) {
                // 检查密码提示问题答案
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function(res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入密码提示问题答案');
            }
        });
        //  第三步 输入新密码提交
        $('#submit-password').click(function() {
            var password = $.trim($('#password').val());
            // 密码是否为空
            if (password && password.length >= 6) {
                // 检查密码
                _user.resetPassword({
                    username: _this.data.username,
                    forgetToken: _this.data.token,
                    passwordNew: password
                }, function(res) {
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入不少于6位的新密码');
            }
        });
        // 回车提交表单
        $('.user-content').keyup(function(event) {
            if (event.keyCode === 13) {
                _this.submit();
            }
        })
    },
    // 加载输入用户名第一步
    loadStepUsername: function() {
        $('.step-username').show();
    },
    // 加载输入密码提示答案第二步
    loadStepQuestion: function() {
        // 清除错误提示
        // 切换容器
        formError.hide();
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    // 加载输入新密码第三步
    loadStepPassword: function() {
        // 清除错误提示
        // 切换容器
        formError.hide();
        $('.step-question').hide()
            .siblings('.step-password').show();
    },
};

$(function() {
    page.init();
});
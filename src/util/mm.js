/*
 * @Author: lingkongc
 * @Date:   2019-06-25 16:26:16
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-06-30 19:47:32
 */

'use strict';

var Hogan = require('hogan.js');

var conf = {
    serverHost: '/api'
}

var _mm = {
    // 网络请求
    request: function(param) {
        // ? 这里this指向哪里
        var _this = this;
        // 有空需要熟悉下jQuery.ajax接口
        $.ajax({
            type: param.method || "get",
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function(res) {
                // 请求成功
                if (res.status === 0) {
                    typeof param.success === 'function' && param.success(res.data);
                }
                // 没有登录 需要强制登录
                else if (res.status === 10) {
                    _this.doLogin();
                }
                // 请求数据错误
                else if (res.status === 1) {
                    typeof param.error === 'function' && param.error(res.data);
                }
            },
            error: function(err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }

        })
    },
    // 获取服务器地址
    getServerUrl: function(path) {
        return conf.serverHost + path;
    },
    // 获取url参数
    getUrlParam: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模版
    renderHtml: function(htmlTemplate, data) {
        // 传入html模版文件，并将数据渲染进模版中
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    // 成功提示
    successTips: function(msg) {
        alert(msg || '操作成功');
    },
    // 失败提示
    errorTips: function(msg) {
        alert(msg || '操作失败');
    },
    // 字段验证，支持非空、手机、邮箱
    validate: function(value, type) {
        var value = $.trim(value);
        if (type === 'require') {
            return !!value;
        }

        if (type === 'phone') {
            return /^1\d{10}$/.test(value);
        }

        if (type === 'email') {
            return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        }
    },
    // 跳转首页
    goHome: function() {
        window.location.href = './index.html'
    },
    // 登录处理
    doLogin: function() {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    }

}

module.exports = _mm;
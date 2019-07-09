/*
 * @Author: Asling
 * @Date:   2019-07-08 19:44:03
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-09 19:36:45
 */

'use strict';
var _mm = require('../util/mm.js');
var _address = {
    getAddressList: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/list.do'),
            data: {
                pageSize: 50
            },
            success: resolve,
            error: reject
        });
    },
    // 新建地址
    save: function(addressInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    update: function(addressInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        })
    },
    // 获取单条收件人地址信息
    getAddress: function(shippingId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/select.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
    // 删除地址
    deleteAddress: function(shippingId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/del.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    }
};

module.exports = _address;
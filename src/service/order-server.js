/*
 * @Author: Asling
 * @Date:   2019-07-08 16:50:14
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-10 15:19:17
 */

'use strict';

var _mm = require('../util/mm.js');

var _order = {
    getProductList: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/get_order_cart_product.do'),
            success: resolve,
            error: reject
        });
    },
    createOrder: function(orderInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/create.do'),
            data: orderInfo,
            success: resolve,
            error: reject
        });
    },
    getOrderList: function(listparam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/list.do'),
            data: listparam,
            success: resolve,
            error: reject
        })
    },
    getOrderDetail: function(orderNo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/detail.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        })
    },
    cancelOrder: function(orderNo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/cancel.do'),
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        })
    },
}

module.exports = _order;
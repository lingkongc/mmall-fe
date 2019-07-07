/*
 * @Author: lingkongc
 * @Date:   2019-06-26 17:30:08
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-07 15:56:40
 */

'use strict';

var _mm = require('../util/mm.js');

var _cart = {
    // 获取购物车数量
    getCartCount: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('./cart/get_cart_product_count.do'),
            method: 'GET',
            success: resolve,
            error: reject
        })
    },
    // 添加购物车
    addToCart: function(productInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('./cart/add.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    }
};

module.exports = _cart;
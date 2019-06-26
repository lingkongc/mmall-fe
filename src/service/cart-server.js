/*
 * @Author: lingkongc
 * @Date:   2019-06-26 17:30:08
 * @Last Modified by:   lingkongc
 * @Last Modified time: 2019-06-26 17:36:46
 */

'use strict';

var _mm = require('../util/mm.js');

var _cart = {
    // 获取购物车数量
    logout: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('./cart/get_cart_product_count.do'),
            method: 'GET',
            success: resolve,
            error: reject
        })
    }
};

module.exports = _cart;
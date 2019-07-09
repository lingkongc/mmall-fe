/*
 * @Author: Asling
 * @Date:   2019-07-08 16:50:14
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-09 09:16:18
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
    }
}

module.exports = _order;
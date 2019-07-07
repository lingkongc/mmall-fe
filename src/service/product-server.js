/*
 * @Author: Asling
 * @Date:   2019-07-05 18:25:46
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-05 18:52:31
 */

'use strict';


var _mm = require('../util/mm.js');

var _product = {
    // 获取产品列表
    getProductList: function(listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/product/list.do'),
            data: listParam,
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
}

module.exports = _product;
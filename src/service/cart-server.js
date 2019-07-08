/*
 * @Author: lingkongc
 * @Date:   2019-06-26 17:30:08
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-08 15:41:25
 */

'use strict';

var _mm = require('../util/mm.js');

var _cart = {
    // 获取购物车数量
    getCartCount: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
            method: 'GET',
            success: resolve,
            error: reject
        })
    },
    // 添加购物车
    addToCart: function(productInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/add.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    },
    // 获取购物车列表
    getCartList: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/list.do'),
            success: resolve,
            error: reject
        })
    },
    // 选中
    selectProduct: function(productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    // 取消选择
    unselectProduct: function(productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/un_select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    // 全选
    selectAllProduct: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject
        });
    },
    // 取消全选
    unselectAllProduct: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject
        });
    },
    // 更新购物车数量
    updateProduct: function(productInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/update.do'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    },
    // 删除商品
    deleteProduct: function(productIds, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/delete_product.do'),
            data: {
                productIds: productIds
            },
            success: resolve,
            error: reject
        })
    }
};

module.exports = _cart;
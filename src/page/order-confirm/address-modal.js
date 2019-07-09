/*
 * @Author: Asling
 * @Date:   2019-07-09 11:32:02
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-09 18:56:19
 */

'use strict';

require('./index.css');
var _mm = require('../../util/mm.js');
var _address = require('../../service/address-server.js');
var _cities = require('../../util/cities/index.js');
var templateAddressModal = require('./address-modal.string');

// 地址模态框组件

var addressModal = {
    // 配置项
    option: {
        // 是否更新
        isUpdate: false,
        // 渲染成功后回调
        onSuccess: function() {},
        // 渲染数据
        data: {}
    },
    show: function(option) {
        this.option = $.extend({}, this.option, option);
        this.$modalWrap = $('.modal-wrap');
        // 渲染页面
        this.loadModal();
        // 绑定事件
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        // 省市和城市二级联动
        this.$modalWrap.find('#receiver-province').change(function() {
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        });
        // 提交收货地址
        this.$modalWrap.find('.address-btn').click(function() {
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate = _this.option.isUpdate;
            // 使用新地址，且验证通过
            if (!isUpdate && receiverInfo.status) {
                _address.save(receiverInfo.data, function(res) {
                    _mm.successTips('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                });
            }
            // 更新收件人，并且验证通过
            else if (isUpdate && receiverInfo.status) {
                _address.update(receiverInfo.data, function(res) {
                    _mm.successTips('地址修改成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                });
            }
            // 验证不通过
            else {
                _mm.errorTips(receiverInfo.errMsg || '好像哪里不对了～');
            }
        });
        // 关闭弹窗
        this.$modalWrap.find('.close').click(function(event) {
            if (event.target !== event.currentTarget) {
                return;
            }
            _this.hide();
        });
    },
    loadModal: function() {
        var addressModalHtml = _mm.renderHtml(templateAddressModal, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        });
        this.$modalWrap.html(addressModalHtml);
        // 加载省份
        this.loadProvince();
    },
    loadProvince: function() {
        var provinces = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        // 如果是更新地址，其有省份信息，则回填
        if (this.option.isUpdate && this.option.data.receiverProvince) {
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    loadCities: function(provinceName) {
        var cities = _cities.getCities(provinceName) || [],
            $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        // 如果是更新地址，其有城市信息，则回填
        if (this.option.isUpdate && this.option.data.receiverCity) {
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    // 获取表单收件人信息，并做表单验证
    getReceiverInfo: function() {
        var receiverInfo = {},
            result = {
                status: false
            };
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = $.trim(this.$modalWrap.find('#receiver-province').val());
        receiverInfo.receiverCity = $.trim(this.$modalWrap.find('#receiver-city').val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());
        if (this.option.isUpdate) {
            receiverInfo.id = $.trim(this.$modalWrap.find('#receiver-id').val());
        }
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        } else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请选择收件人所在省份';
        } else if (!receiverInfo.receiverCity) {
            result.errMsg = '请选择收件人所在城市';
        } else if (!receiverInfo.receiverPhone) {
            result.errMsg = '请输入手机号';
        } else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请输入详细地址';
        } else if (!receiverInfo.receiverZip) {
            result.errMsg = '请输入邮政编码';
        } else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    },
    getSelectOption: function(optionArray) {
        var html = '<option value="">请选择</option>';
        for (var i = 0, length = optionArray.length; i < length; i++) {
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
        }
        return html;
    },
    hide: function() {
        this.$modalWrap.empty();
    },
}

module.exports = addressModal;
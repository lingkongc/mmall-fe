/*
 * @Author: lingkongc
 * @Date:   2019-06-24 10:24:41
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-07-05 17:28:00
 */

'use strict';
require('./../../util/swiper/swiper.css');
require('./index.css');
require('../../page/common/nav/index.js');
require('../../page/common/header/index.js');
var Swiper = require('../../util/swiper/swiper.js');
var templateBanner = require('./banner.string');
var _mm = require('../../util/mm.js');

$(document).ready(function() {
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-container').html(bannerHtml);

    //initialize swiper when document ready
    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 5000,
        },

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    })
});
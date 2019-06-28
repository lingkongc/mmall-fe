/*
 * @Author: Asling
 * @Date:   2019-06-27 18:28:49
 * @Last Modified by:   Asling
 * @Last Modified time: 2019-06-28 12:35:52
 */

'user strict';
require('./index.css');
require('../common/nav-simple/index.js');
var _mm = require('../../util/mm.js');

$(function() {
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');

    $element.show();
});
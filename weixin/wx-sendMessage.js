var config = require('./config');

var moment = require('moment');
var API = require('wechat-api');
var api = new API(config.appid, config.appsecret);

const ORDERTEMPLATE = 'XX7ZcIQZVDCfNYFhQJSrIWLd3iP7ZoyCfEqVUL8y7aw';

exports.getLatestToken = function (callback) {
    api.getLatestToken(callback);
}

exports.sendMessage = function (cart) {
    var openId = cart.merchant.openId;
    if (openId) {
        var templateId = '';
        var data = {};
        if (cart.status === 3) { //CONFIRMED
            templateId = ORDERTEMPLATE;
            data = createConfirmStr(cart);
        }

        if (templateId !== '') {
            console.log('weixing message: ' + JSON.stringify(data));
            api.sendTemplate(openId, templateId, null, data, sendResult);
        }
    }

}

function createConfirmStr(cart) {
    var json = {};
    json.first = {};
    json.first.value = '您有一个新订单';
    json.first.color = '#173177';

    json.keyword1 = {};
    json.keyword1.value = cart.id;

    json.keyword2 = {};
    var updatedOn = moment(new Date().setTime(cart.updatedOn));
    json.keyword2.value = updatedOn.format('YYYY-MM-DD HH:mm:ss');

    return json;
}

function sendResult(err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
}

exports.api = api;
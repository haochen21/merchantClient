var config = require('./config');

var moment = require('moment');
var API = require('wechat-api');
var api = new API(config.appid, config.appsecret);

const ORDERTEMPLATE = 'IvBTQmuWSJ2HJ9FD5ke3Ve2nwrggu23lgSqJh23Vqgk';

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
    var updatedOn = moment(new Date().setTime(cart.updatedOn));
    json.keyword1.value = updatedOn.format('YYYY-MM-DD HH:mm:ss');

    json.keyword2 = {};
    json.keyword2.value = cart.id + '(提货码：'+ cart.takeNo+' )';
    json.keyword3 = {};
    var products = '';
    for(var i=0; i< cart.cartItems.length;i++){
        products += cart.cartItems[i].name+',数量:'+cart.cartItems[i].quantity+' '
    }
    json.keyword3.value = products;

    json.remark = {};
    var remark = '';
    if(cart.remark != null){
        remark = '商品备注：'+cart.remark;
    }
    json.remark.value = remark;

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
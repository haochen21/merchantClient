var config = require('./config');
var OAuth = require('wechat-oauth');
var express = require('express');
var router = express.Router();
var securityService = require('../service/security');
var fs = require('fs');

// 微信授权和回调
var client = new OAuth(config.appid, config.appsecret);

// 主页,主要是负责OAuth认真
router.get('/', function (req, res) {
  var url = client.getAuthorizeURL(config.url + '/weixin/merchant/callback', '', 'snsapi_userinfo');
  // 重定向请求到微信服务器
  res.redirect(url)
})

/**
 * 认证授权后回调函数
 *
 * 根据openid判断是否用户已经存在
 * - 如果是新用户，注册并绑定，然后跳转到手机号验证界面
 * - 如果是老用户，跳转到主页
 */
router.get('/callback', function (req, res) {
  console.log('----weixin callback -----')
  var code = req.query.code;

  if (req.session && req.session.merchant) {
    console.log('----weixin session exist------');
    // if phone_number exist,go home page
    if (req.session.merchant.phone) {
      res.redirect('/?#/order');
    } else {
      res.redirect('/?#/weixinRegister');
    }
  } else {
    client.getAccessToken(code, function (err, result) {

      console.log("get weixin access_token" + result);
      var accessToken = result.data.access_token;
      var openid = result.data.openid;

      securityService.findMerchantByOpenId(openid, function (err, merchant) {
        console.log('微信回调后,返回的user = ' + merchant);
        if (err || merchant === null) {
          console.log('user is not exist.');

          client.getUser(openid, function (err, result) {
            console.log('use weixin api get merchant,err: ' + err);
            console.log('use weixin api get merchant,result: ' + JSON.stringify(result));

            var oauth_user = result;

            var _merchant = {};
            _merchant.openId = oauth_user.openid;
            _merchant.loginName = oauth_user.nickname;
            _merchant.name = oauth_user.nickname;
            _merchant.city = oauth_user.city;
            _merchant.province = oauth_user.province;
            _merchant.country = oauth_user.country;
            _merchant.headImgUrl = oauth_user.headimgurl;
            _merchant.name = oauth_user.nickname;
            _merchant.password = '123456';

            securityService.createMerchantByWeixin(_user, function (err, result) {
              if (err) {
                console.log('merchant save error ....' + err);
              } else {
                console.log('merchant save sucess ....' + JSON.stringify(result));
                req.session.auth = true;
                req.session.merchant = result;
                res.redirect('/?#/weixinRegister');
              }
            });

          });
        } else {
          console.log('根据openid查询，用户已经存在');
          req.session.auth = true;
          req.session.merchant = user;
          // if phone_number exist,go home page
          if (merchant.phone) {
            res.redirect('/?#/order');
          } else {
            res.redirect('/?#/weixinRegister');
          }
        }
      });
    });
  }
});

module.exports = router;

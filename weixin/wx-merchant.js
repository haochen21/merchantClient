var config = require('./config');
var appConfig = require('../config');
var request = require("request");
var OAuth = require('wechat-oauth');
var express = require('express');
var router = express.Router();
var securityService = require('../service/security');
var fs = require('fs');

var wechatApi = require('./wx-sendMessage').api;

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
    securityService.findMerchantByOpenId(req.session.merchant.openId, function (err, merchant) {
      console.log('find by openid:', JSON.stringify(merchant));
      if (err || merchant === null) {
        createMerchant(code, req, res);
      } else {
        req.session.merchant = merchant;
        // if phone_number exist,go home page
        if (!req.session.merchant.approved) {
          req.session.merchant = merchant;
          res.redirect('/?#/approved');
        } else if (req.session.merchant.phone) {
          res.redirect('/?#/order');
        } else {
          res.redirect('/?#/weixinRegister');
        }
      }
    });
  } else {
    createMerchant(code, req, res);
  }
});

router.get('/jsconfig', function (req, res) {
  var param = {
    debug: false,
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
    url: config.jsUrl
  };
  wechatApi.getJsConfig(param, function (err, result) {
    //console.log('jsconfig: ' + JSON.stringify(result));
    res.json(result);
  });

});

router.get('/qrcode/:id', function (req, res) {
  let id = req.params.id;
  request.get({
    url: 'http://shop.km086.com/weixin/customer/qrcode/' + id
  }, function (err, response, body) {
    if (err) {
      console.error("modify ticket error:", err, " (status: " + err.status + ")");
      res.status(404).end();
    } else {
      console.log(body);
      res.status(200).send({ ticket: JSON.parse(body).ticket });
    }
  });
});

router.get('/findMerchant/:id', function (req, res) {
  let id = req.params.id;
  request.get({
    url: appConfig.remoteServer + '/security/merchant/' + id
  }, function (err, response, body) {
    if (err) {
      console.error("find merchant error:", err, " (status: " + err.status + ")");
      res.status(404).end();
    } else {
      res.status(200).send(body);
    }
  });
});

function createMerchant(code, req, res) {
  client.getAccessToken(code, function (err, result) {

    console.log("get weixin access_token" + result);
    var accessToken = result.data.access_token;
    var openid = result.data.openid;

    securityService.findMerchantByOpenId(openid, function (err, merchant) {
      console.log('微信回调后,返回的user = ' + merchant);
      if (err || merchant === null) {
        console.log('merchant is not exist.');

        client.getUser(openid, function (err, result) {
          console.log('weixin api get merchant,err: ' + err);
          console.log('weixin api get merchant,result: ' + JSON.stringify(result));

          var oauth_user = result;

          var _merchant = {};
          _merchant.openId = oauth_user.openid;
          _merchant.loginName = oauth_user.nickname;
          _merchant.city = oauth_user.city;
          _merchant.province = oauth_user.province;
          _merchant.country = oauth_user.country;
          _merchant.headImgUrl = oauth_user.headimgurl;
          _merchant.password = '123456';
          _merchant.open = true;
          _merchant.approved = false;
          _merchant.discount = 1.0;

          securityService.createMerchantByWeixin(_merchant, function (err, result) {
            if (err) {
              console.log('merchant save error ....' + err);
            } else {
              console.log('merchant save sucess ....' + JSON.stringify(result));
              if (result) {
                req.session.auth = true;
                req.session.merchant = result;
                res.redirect('/?#/approved');
              } else {
                req.session.auth = false;
                req.session.merchant = null;
              }
            }
          });

        });
      } else {
        console.log('根据openid查询，用户已经存在');
        req.session.auth = true;
        req.session.merchant = merchant;
        // if phone_number exist,go home page
        if (!merchant.approved) {
          res.redirect('/?#/approved');
        } else if (merchant.phone) {
          res.redirect('/?#/order');
        } else {
          res.redirect('/?#/weixinRegister');
        }
      }
    });
  });
}


module.exports = router;

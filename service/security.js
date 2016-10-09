var request = require("request");
var config = require("../config");

exports.login = function (req, res) {
    let loginName = req.body.loginName;
    let password = req.body.password;
    var session = req.session;
    request.post({
        url: config.remoteServer + '/security/merchant/login',
        form: {
            loginName: loginName,
            password: password
        }
    }, function (err, response, body) {
        if (err) {
            console.error("login error:", err, " (status: " + err.status + ")");
            res.status(404).end();
        } else {
            var loginResult = {};
            var loginObj = JSON.parse(body);
            loginResult.result = loginObj.loginResult;

            if (loginObj.result === 'AUTHORIZED') {
                session.auth = true;
                session.merchant = loginObj.merchant;
            }
            res.status(200).send(body);
        }
    });
}

exports.loginNameExists = function (req, res) {
    let loginName = req.params.loginName;

    request.get({
        url: config.remoteServer + '/security/merchant/loginNameExists/' + loginName
    }, function (err, response, body) {
        if (err || response.statusCode != 200) {
            res.status(404).end();
        } else {
            if (body === "true") {
                res.status(200).send({ exist: true });
            } else {
                res.status(200).send({ exist: false });
            }
        }
    });
}

exports.deviceExists = function (req, res) {
    let deviceNo = req.params.deviceNo;

    request.get({
        url: config.remoteServer + '/security/device/' + deviceNo
    }, function (err, response, body) {
        if (err || response.statusCode != 200) {
            res.status(404).end();
        } else {
            if (body === "true") {
                res.status(200).send({ exist: true });
            } else {
                res.status(200).send({ exist: false });
            }
        }
    });
}

exports.phoneExists = function (req, res) {
    let phone = req.params.phone;

    request.get({
        url: config.remoteServer + '/security/merchant/phone/' + phone
    }, function (err, response, body) {
        if (err || response.statusCode != 200) {
            res.status(404).end();
        } else {
            if (body === "true") {
                res.status(200).send({ exist: true });
            } else {
                res.status(200).send({ exist: false });
            }
        }
    });
}

exports.devicePhoneExists = function (req, res) {
    let phone = req.params.phone;

    request.get({
        url: config.remoteServer + '/security/device/phone/' + phone
    }, function (err, response, body) {
        if (err || response.statusCode != 200) {
            res.status(404).end();
        } else {
            if (body === "true") {
                res.status(200).send({ exist: true });
            } else {
                res.status(200).send({ exist: false });
            }
        }
    });
}

exports.registerMerchantInWeixin = function (req, res) {
    let merchant = req.session.merchant;
    let id = merchant.id;

    let phone = req.body.phone;

    request({
        url: config.remoteServer + '/security/merchant/weixin',
        method: 'PUT',
        form: {
            id: id,
            phone: phone
        }
    }, function (err, response, body) {
        if (err) {
            console.error("modify merchant in weixin error:", err, " (status: " + err.status + ")");
            res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
}

exports.findMerchant = function (req, res) {
    var merchant = req.session.merchant;
    let id = merchant.id;
    request.get({
        url: config.remoteServer + '/security/merchant/' + id
    }, function (err, response, body) {
        if (err) {
            console.error("find merchant error:", err, " (status: " + err.status + ")");
            res.status(404).end();
        } else {
            res.status(200).send(body);
        }
    });
}

exports.createMerchant = function (req, res) {
    let merchant = req.body.merchant;
    console.log(merchant);

    request({
        url: config.remoteServer + '/security/merchant',
        method: 'POST',
        json: merchant
    }, function (err, response, body) {
        if (err || response.statusCode != 200) {
            res.status(404).end();
        } else {
            res.status(200).send(body);
        }
    });
}

exports.modifyMerchant = function (req, res) {
    let merchant = req.body.merchant;
    console.log(merchant);

    request({
        url: config.remoteServer + '/security/merchant',
        method: 'PUT',json: merchant
    }, function (err, response, body) {
        if (err || response.statusCode != 200) {res.status(404).end();
        } else {res.status(200).send(body);
        }
    });
}

exports.modifyPassword = function (req, res) {
    let merchant = req.session.merchant;
    let id = merchant.id;

    let password = req.body.password;

    request({
        url: config.remoteServer + '/security/merchant/password',
        method: 'PUT',
        form: {
            id: id,
            password: password
        }
    }, function (err, response, body) {
        if (err) {
            console.error("modify password error:", err, " (status: " + err.status + ")");
            res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
}

exports.modifyOpen = function (req, res) {
    let open = req.body.open;

    let merchant = req.session.merchant;
    let id = merchant.id;

    request({
        url: config.remoteServer + '/security/merchant/open',
        method: 'POST',
        form: {
            id: id,
            open: open
        }
    }, function (err, response, body) {
        if (err) {
            console.error("modify open error:", err, " (status: " + err.status + ")");
            res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
}

exports.updateMerchantQrCode = function (req, res) {
    let merchant = req.session.merchant;
    let id = merchant.id;

    request({
        url: config.remoteServer + '/security/merchant/qrCode',
        method: 'POST',
        form: {
            id: id
        }
    }, function (err, response, body) {
        if (err) {
            console.error("modify qrCode error:", err, " (status: " + err.status + ")");
            res.status(404).end();
        } else {
            res.status(200).send({ qrCode: body });
        }
    });

}

exports.findOpenRange = function (req, res) {
    let merchant = req.session.merchant;
    let id = merchant.id;

    request.get({
        url: config.remoteServer + '/security/merchant/openRange/' + id
    }, function (err, response, body) {
        if (err) {
            console.error("find open ranges error:", err, " (status: " + err.status + ")");
            res.status(404).end();
        } else {
            res.status(200).send(body);
        }
    });
}

exports.createOpenRange = function (req, res) {
    let merchant = req.session.merchant;
    let id = merchant.id;

    let openRanges = req.body.openRanges;

    request({
        url: config.remoteServer + '/security/merchant/openRange/' + id,
        method: 'POST',
        json: openRanges
    }, function (err, response, body) {
        if (err || response.statusCode != 200) {
            res.status(404).end();
        } else {
            res.status(200).send(body);
        }
    });
}

exports.merchantLock = function (req, res) {
    let merchant = req.session.merchant;
    if (!merchant) {
        res.status(200).send({
            unLock: true
        });
    }
    let loginName = user.loginName;
    let password = req.body.password;

    request.post({
        url: config.remoteServer + '/security/merchant/login',
        form: {
            loginName: loginName,
            password: password
        }
    }, function (err, response, body) {
        if (err) {
            console.error("login error:", err, " (status: " + err.status + ")");
            res.status(404).end();
        } else {
            var loginResult = {};
            var loginObj = JSON.parse(body);
            loginResult.result = loginObj.loginResult;

            if (loginObj.result === 'AUTHORIZED') {
                res.status(200).send({
                    unLock: true
                });
            } else {
                res.status(200).send({
                    unLock: false
                });
            }
        }
    });
}

exports.findMerchantByOpenId = function (openId, callback) {
    request.get({
        url: config.remoteServer + '/security/merchant/openId/' + openId
    }, function (err, response, body) {
        if (err || response.statusCode != 200) {
            callback(err);
        } else {
            if (body === '') {
                callback(null, null);
            } else {
                callback(null, JSON.parse(body));
            }
        }
    });
}

exports.createMerchantByWeixin = function (merchant, callback) {
    console.log(merchant);

    request({
        url: config.remoteServer + '/security/merchant',
        method: 'POST',
        json: merchant
    }, function (err, response, body) {
        if (err || response.statusCode != 200) {
            callback(err);
        } else {
            callback(null, body);
        }
    });
}
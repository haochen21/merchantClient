const routes = require('express').Router();
const portalAuth = require('./wx-portalAuth');
const merchant = require('./wx-merchant');

routes.use('/portalAuth', portalAuth);
routes.use('/merchant', merchant);

module.exports = routes;
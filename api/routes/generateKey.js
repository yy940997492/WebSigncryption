/*
 * @Author: CUIT渊
 * @Date: 2022-11-03 20:17:13
 * @LastEditTime: 2022-11-07 20:01:57
 * @FilePath: \api\routes\generateKey.js
 */
var express = require('express');
var router = express.Router();
const {getPairKey} = require('../sigcrypt/getKey')

//获取签密所需的公私钥对
router.get('/', function(req, res, next) {
  res.send(getPairKey());
});

module.exports = router;

/*
 * @Author: CUIT渊
 * @Date: 2022-11-03 20:35:11
 * @LastEditTime: 2022-11-07 20:02:26
 * @FilePath: \api\routes\enSigCryp.js
 */
var express = require('express');
var router = express.Router();
const {enSigCryp} = require('../sigcrypt/enSig')


//进行签密，获得中间值对称密钥k1,k2，和最终的签密结果σ
router.post('/', function(req, res, next) {
  console.log("body:",req.body)
  const msg = req.body.msg
  //const yb = "0x1da93ad83d34da696498d35cd95ca9a61d631975be1015501d4e3f26b727216e3d48dc544da77032171fd9e53a3e640ebc7248519ec93aec8ae1c1f2a9f7f9c2"
  const yb = req.body.yb
  const bgyb = BigInt(yb)
  //const xa = "0x5872d5784a728dde4ea5831e0"
  const xa = req.body.xa
  const bgxa = BigInt(xa)
  const algroithm = parseInt(req.body.SCS);
  res.send(enSigCryp(msg,bgyb,bgxa,algroithm))
});

module.exports = router;

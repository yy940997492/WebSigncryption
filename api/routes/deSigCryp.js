/*
 * @Author: CUIT渊
 * @Date: 2022-11-03 21:10:03
 * @LastEditTime: 2022-11-07 20:03:05
 * @FilePath: \api\routes\deSigCryp.js
 */
var express = require('express');
var router = express.Router();
const {deSigCryp} = require('../sigcrypt/deSig')

//进行解签密，获得dk1、dk2、明文m、dr、结果verify
router.post('/', function(req, res, next) {
  console.log("body:",req.body)
  /* const c = "e3d0cba4da3aa662eebeb7818b236649"
  const r = "0x7ad6bc434b11fbcf38373b4e55ff052af5693a9"
  const s = "0x92c604c70dafdb42631e9e1e85484ca3a3881111"*/
  //const ya = "0x2a0cf4dd05969bb7d512c37475a1f406fe38182f2ab2f658270a394a663caa84ad5d6da8a049db86437c919512af0d30f2770e45435da542de0f6fb90872b667"
  const ya = req.body.ya
  //const xb = "0x2450879ce7e8c47177c617c0cead84" 
  const xb = req.body.xb
  const algorithm = parseInt(req.body.SCS);
  const c = req.body.c
  const bgr = BigInt(req.body.r) 
  const bgs = BigInt(req.body.s)
  const bgya =BigInt(ya) 
  const bgxb = BigInt(xb)
  res.send(deSigCryp(c,bgr,bgs,bgya,bgxb,algorithm))
});

module.exports = router;

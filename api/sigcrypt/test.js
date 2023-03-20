/*
 * @Author: CUIT渊
 * @Date: 2022-11-03 20:13:24
 * @LastEditTime: 2022-11-07 19:56:05
 * @FilePath: \api\sigcrypt\test.js
 */
const crypto = require("crypto")
const CryptoJS = require("crypto-js");
const {getPublickey,verifySigCryp,getSigCrypK1AndK2,generateX,getMsgSigCryp,getDeSigCrypK1AndK2,} = require('./tools.js')
const {init} = require('./init');
const {p,q,g} = init
const {xa,xb,x} = {
    xa:generateX(),
    xb:generateX(),
    x:generateX(),
};
//一、密钥生成阶段
ya = getPublickey(g,xa,p)
yb = getPublickey(g,xb,p) 
console.log("发送方私钥xa:",xa,"发送方公钥ya:",ya)
console.log("接收方私钥xb:",xb,"接收方公钥yb:",yb)
const msg = "CUIT"

//二、签密阶段
console.log("生成的随机整数x:",x)
//计算k1和k2
const [k1,k2] = getSigCrypK1AndK2(yb,x,p)
console.log("k1:",k1,"k2:",k2)
//构造对称加密的密钥和偏移量
const enCrpytoConfig = {
    AES_KEY: k1,
    AES_IV: "",
}
//构造签密的参数
const enSCConfig = {
    x:x,
    privateKeyA:xa,
    q:q,
    algorithm:1
}
//进行签密
const {c,r,s} = getMsgSigCryp(msg,enCrpytoConfig,k2,enSCConfig)
console.log("密文c:",c)
console.log("哈希r:",r)
console.log("签名s:",s)

//构造解签密参数
const deSCConfig = {
    ya:ya,
    g:g,
    xb:xb,
    p:p,
    algorithm:1
}

//三、解签密阶段
//获得dk1，dk2
/* const [dk1,dk2] = getDeSigCrypK1AndK2({c,r,s},ya,g,xb,p,1)
console.log("dk1:",dk1,"dk2:",dk2) */
//验证签密
const verify = verifySigCryp({c,r,s},deSCConfig)
console.log(verify)


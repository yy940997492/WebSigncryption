/*
 * @Author: CUIT渊
 * @Date: 2022-11-03 20:38:27
 * @LastEditTime: 2022-11-07 20:00:57
 * @FilePath: \api\sigcrypt\enSig.js
 */
const {init} = require('./init');
const {getPublickey,verifySigCryp,getSigCrypK1AndK2,generateX,getMsgSigCryp,getDeSigCrypK1AndK2,} = require('./tools.js')
const {p,q,g} = init

//生成随机数X

const getK1AndK2 = (yb,X)=>{
    const [k1,k2] = getSigCrypK1AndK2(yb,X,p)
    return [k1,k2]
}

//获得构造签密的参数
const getEnSCConfig = (xa,algorithm,X)=>{
    return {
        x:X,
        privateKeyA:xa,
        q:q,
        algorithm:algorithm
    }
}
//进行签密
const enSigCryp = (msg,yb,xa,algorithm)=>{
    const X = generateX();
    const [k1,k2] = getK1AndK2(yb,X)
    const enSCConfig = getEnSCConfig(xa,algorithm,X)
    //构造对称加密的密钥和偏移量
    const enCrpytoConfig = {
        AES_KEY: k1,
        AES_IV: "",
    }
    const {c,r,s} = getMsgSigCryp(msg,enCrpytoConfig,k2,enSCConfig)
    return {
        x:"0x"+X.toString(16),
        k1:"0x"+k1.toString(16),
        k2:"0x"+k2.toString(16),
        c:c,
        r:"0x"+r.toString(16),
        s:"0x"+s.toString(16),
    }
}

module.exports = {enSigCryp}
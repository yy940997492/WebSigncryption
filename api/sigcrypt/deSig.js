/*
 * @Author: CUIT渊
 * @Date: 2022-11-03 21:12:03
 * @LastEditTime: 2022-11-07 20:01:20
 * @FilePath: \api\sigcrypt\deSig.js
 */
const {init} = require('./init');
const {getPublickey,verifySigCryp,getSigCrypK1AndK2,generateX,getMsgSigCryp,getDeSigCrypK1AndK2,} = require('./tools.js')
const {p,q,g} = init

const deSigCryp = (c,r,s,ya,xb,algorithm)=>{
    const deSCConfig = {
        ya:ya,
        g:g,
        xb:xb,
        p:p,
        algorithm:algorithm
    }
    const verify =  verifySigCryp({c,r,s},deSCConfig)
    if(verify.verify === "verify false"){
        return verify;
    }else if(verify.verify === "verify success"){;
        return{
            dk1:"0x"+verify.dk1.toString(16),
            dk2:"0x"+verify.dk2.toString(16),
            m:verify.m,
            dr:"0x"+verify.dr.toString(16),
            verify:"verify success",
        }
    }
}
module.exports = {
    deSigCryp,
}
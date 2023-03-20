/*
 * @Author: CUIT渊
 * @Date: 2022-11-03 20:20:50
 * @LastEditTime: 2022-11-07 20:00:23
 * @FilePath: \api\sigcrypt\getKey.js
 */
const {init} = require('./init');
const {getPublickey,verifySigCryp,getSigCrypK1AndK2,generateX,getMsgSigCryp,getDeSigCrypK1AndK2,} = require('./tools.js')
const {p,q,g} = init
const getPairKey = ()=>{ 
    const xa = generateX()
    const xb = generateX()
    const ya = getPublickey(g,xa,p)
    const yb = getPublickey(g,xb,p) 
    //console.log("xa:"+"0x"+xa.toString(16))
    return {xa:"0x"+xa.toString(16),xb:"0x"+xb.toString(16),ya:"0x"+ya.toString(16),yb:"0x"+yb.toString(16)}
} //({xa:"0x"+xa.toString(16),xb:"0x"+xb.toString(16),ya:"0x"+ya.toString(16),yb:"0x"+yb.toString(16)})
module.exports = {
    getPairKey
}
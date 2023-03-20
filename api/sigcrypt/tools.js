/*
 * @Author: CUIT渊
 * @Date: 2022-11-03 20:11:07
 * @LastEditTime: 2022-11-08 10:20:49
 * @FilePath: \api\sigcrypt\tools.js
 */
const CryptoJS = require("crypto-js");
const crypto = require('crypto')
const {init} = require('./init')
const {p,q,g} = init
const ByteOfQ = q.toString(16).length/2
const MinByteSize = 50;
const bigintModArith = require('bigint-mod-arith')

/**
 * 验证签密
 * @param {bigint,bigint,bigint,bigint,number} msgSigCrypt 
 * @param {string,bigint,bigint} deSCConfig 
 * @returns 
 */
const verifySigCryp = (msgSigCrypt,deSCConfig)=>{
  const {ya,g,xb,p,algorithm}  = deSCConfig
  const {c,r,s} = msgSigCrypt;
  const [dk1,dk2] =  getDeSigCrypK1AndK2(msgSigCrypt,ya,g,xb,p,algorithm);
  const deCrpytoConfig = {
    AES_KEY: dk1,
    AES_IV: "",
  } 
  const m = cryptoDecrypt(c,deCrpytoConfig);
  const dr = getR(m,dk2);
  const isVerify = (dr===r);
  if(isVerify){
    return {
      dk1:dk1,
      dk2:dk2,
      m:m,
      dr:dr,
      verify:"verify success",
    }
  }else{
    return {
      verify:"verify false"
    }
  }
}

/**
 * 解签密，计算k1，k2
 * @param {*} msgSigCrypt 
 * @param {BigInt} ya 
 * @param {BigInt} g 
 * @param {BigInt} xb 
 * @param {BigInt} p 
 * @param {number} algorithm 
 * @returns 
 */
const getDeSigCrypK1AndK2 = (msgSigCrypt,ya,g,xb,p,algorithm)=>{
  const {c,r,s} = msgSigCrypt;
  let k;
 /*  if(algorithm===1){
     k = CryptoJS.SHA1((fastPowerMod(ya,s*xb,p)*fastPowerMod(g,r*s*xb,p))%p).toString(CryptoJS.enc.Hex)
  }else if(algorithm===2){
    k = CryptoJS.SHA1((fastPowerMod(g,s*xb,p)*fastPowerMod(ya,r*s*xb,p))%p).toString(CryptoJS.enc.Hex)
  } */
  //const hash = crypto.createHash('sha1');
  //let ybxmodp = fastPowerMod(yb,x,p) //(yb^xmod p)
  if(algorithm===1){
    cur = "0x"+((fastPowerMod(ya,s*xb,p)*fastPowerMod(g,r*s*xb,p))%p).toString(16)
    k = CryptoJS.SHA1(cur).toString(CryptoJS.enc.Hex)
    console.log(cur)
  }else if(algorithm===2){
    cur = "0x"+((fastPowerMod(g,s*xb,p)*fastPowerMod(ya,r*s*xb,p))%p).toString(16)
    k = CryptoJS.SHA1(cur).toString(CryptoJS.enc.Hex)
  }
  
  const k1 = k.slice(0,20) //sha1为20位，也就是40长度
  const k2 = k.slice(20,40)
  return [k1,k2]
}

/**
 * 获得消息签密
 * @param {string} msg 
 * @param {*} currentCrpytoConfig 
 * @param {string} k2 
 * @param {*} scsConfig 
 * @returns 
 */
const getMsgSigCryp = (msg,enCrpytoConfig,k2,scsConfig)=>{
  const {x,privateKeyA,q,algorithm} = scsConfig;
  r =getR(msg,k2);
  return {
    c:cryptoEncrypt(msg,enCrpytoConfig),
    r:r,
    s:algorithm===1?SCS1(x,r,privateKeyA,q):SCS2(x,r,privateKeyA,q)
  }
}

/**
 * 
 * @param {string} msg 
 * @param {string} k2 
 * @returns 
 */
const getR = (msg,k2)=> BigInt("0x"+CryptoJS.HmacSHA1(msg, k2).toString(CryptoJS.enc.Hex))
  /* const hmac = crypto.createHmac('sha1', k2);
  hmac.update(msg);
  //console.log(hmac.digest('hex'));
  return BigInt('0x'+hmac.digest('hex')); */
  


//乘法逆元
const SCS1 = (x,r,privateKey,q)=>(x * modInverse(r+privateKey,q)) % q
  /* const modIn = modInverse(r+privateKey,q);
  return (x * modIn) % q
} */
const SCS2 = (x,r,privateKey,q)=> (x * modInverse(privateKey*r+1n,q)) % q
  /* const modIn = modInverse(privateKey*r+1n,q);
  return (x * modIn) % q
} */
/* function ksm(a,b,mod)
{
    ans=1n;
    while(b)
    {
        if(b&1n) ans=(ans*a)%mod;
        a=(a*a)%mod;
        b>>=1n;
    }
    return ans;
}  */

const getRandomInt = (max,min)=>Math.floor(Math.random()*(max-min+1)+min)

//生成 1<=x<=q-1
const generateX = ()=>BigInt('0x'+crypto.randomBytes(getRandomInt(ByteOfQ-1,MinByteSize)).toString('hex'))
//console.log(generateX())
//console.log(5568613725021938871967973252743530300353932086n.toString(16))
//f9b48cf06e8cd37662f461b1d8108b53e5eb36
/**
 * @description aes加密
 * @param {string} word 需要加密的字符串
 */
const cryptoEncrypt = (word,crpytoConfig) => {
  const { AES_IV, AES_KEY } = crpytoConfig
  const key = CryptoJS.enc.Utf8.parse(AES_KEY)
  const iv = CryptoJS.enc.Utf8.parse(AES_IV)
  const srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = '';

  encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString(CryptoJS.enc.Hex)
}

const desEn = (word,key) => {
  const cipher = crypto.createCipher('des', key);
  let encrypted = cipher.update(word, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

const desDe = (word,key) =>{
  const decipher = crypto.createDecipher('des', key);
  let decrypted = decipher.update(word, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted
}

/**
 * @description aes解密
 * @param {string} word 需要解密的字符串
 */
 const cryptoDecrypt = (word,crpytoConfig) => {
  const { AES_IV, AES_KEY } = crpytoConfig
  //所以这里做了字符替换才能正常进行加解密 所以下边这句视情况而定到底加不加
  //const strWord = word.replace(/\_/g, '/').replace(/\-/g, '+')
  const strWord = word
  const key = CryptoJS.enc.Utf8.parse(AES_KEY)
  const iv = CryptoJS.enc.Utf8.parse(AES_IV)
  const encryptedHexStr = CryptoJS.enc.Hex.parse(strWord)
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  let decrypt = ''

  decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypt.toString(CryptoJS.enc.Utf8).toString()
}

const getPublickey = (g,privateKey,p)=>{
  return fastPowerMod(g, privateKey, p)
}

const fastPowerMod = (a, b, c) =>bigintModArith.modPow(a, b, c)
 /* function fastPowerMod(a, b, c){
  return bigintModArith.modPow(a, b, c)
  /* let res = 1n 
  a %= c
  while (b) {
      if(b&1n){
          res = (res*a)%c
      }
      a = a*a%c
      b>>=1n
  }
  return res */ 


//console.log(fastPowerMod(123456n,300n,123n))

const getSigCrypK1AndK2 = (yb,x,p)=>{
  //const hash = crypto.createHash('sha1');
  let ybxmodp = "0x"+fastPowerMod(yb,x,p).toString(16) //(yb^xmod p)
  //console.log(ybxmodp)
  //hash.update(ybxmodp); //求hash
  //const k = hash.digest('hex')
  k = CryptoJS.SHA1(ybxmodp).toString(CryptoJS.enc.Hex)
  const k1 = k.slice(0,20) 
  const k2 = k.slice(20,40)
  return [k1,k2]
}

//模逆运算
const modInverse =(a, b)=> bigintModArith.modInv(a, b)

//getSigCrypK1AndK2()
/* function toHex(n) {
  base = BigInt(16)
  array = []
  map = {
      10: 'a',
      11: 'b',
      12: 'c',
      13: 'd',
      14: 'e',
      15: 'f'
  }
  while(n > 0){
      res = n % base
      n = n / base
      if (res >= 10) {
          res = map[res]
      }
      array.push(res.toString())
  }
  array.reverse()
  return "0x"+array.join("")
} */
module.exports = {
  getPublickey,verifySigCryp,getSigCrypK1AndK2,generateX,getMsgSigCryp,getDeSigCrypK1AndK2,
}
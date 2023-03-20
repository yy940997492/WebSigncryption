import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {//配置开启antd组件库
    dark: false,
    compact: true,
  },
  layout: {//开启layout支持
    // 支持任何不需要 dom 的
    // https://procomponents.ant.design/components/layout#prolayout
    name: '数字签密',
    locale: true,
    layout: 'side',
    logo:'https://www.cuit.edu.cn/__local/A/56/12/9D2095DBAF74A06EED40AAAF0E2_44C6156F_138E0.png?e=.png',
  },
  routes: [
    { path: '/', component: '@/pages/index' ,name:'Main'},
    { path: '/getkey', component: '@/pages/getPairKey' ,name:'生成公私钥对'},
    { path: '/enSig', component: '@/pages/enSigCrypt' ,name:'进行签密'},
    { path: '/deSig', component: '@/pages/deSigCrypt' ,name:'验证签密'},
  ],
  fastRefresh: {},
});

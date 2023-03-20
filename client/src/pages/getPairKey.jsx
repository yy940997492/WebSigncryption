/*
 * @Author: CUIT渊
 * @Date: 2022-11-03 21:54:12
 * @LastEditTime: 2022-11-07 20:05:56
 * @FilePath: \client\src\pages\getPairKey.jsx
 */
import { Button, Descriptions, Radio ,Alert, Result} from 'antd';
import React, { useState ,useEffect} from 'react';
const App = () => {

  const [key,setKey] = useState("")
  useEffect(()=>{
    fetch('http://localhost:3000/getPairKey')
    .then((res)=>res.json())
    .then((data)=>{
      setKey(data)
    })
  },[])
  //console.log(key)
    
  return (
    <div>
      <Tips/>
      <Descriptions
        bordered = "true"
        size = "middle"
        title="密钥数据"
      >
        <Descriptions.Item label="发送方私钥xa" span="3">{key.xa} </Descriptions.Item>
        <Descriptions.Item label="发送方公钥ya" span="3">{key.ya} </Descriptions.Item>
        <Descriptions.Item label="接收方私钥xb" span="3">{key.xb} </Descriptions.Item>
        <Descriptions.Item label="接收方公钥yb" span="3">{key.yb} </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <Tips/>
      <br />
      <Success/>
    </div>
  );
};
export default App;


const Success = () => (
  <Result
    status="success"
    title="成功获取密钥对"
    subTitle={new Date().toLocaleDateString()+"   "+new Date().toLocaleTimeString()}
  />
);


//export const Tips = () => <Alert message="请复制好您的密钥,用于签密与验证签密！！！" type="success" />;


const onClose = (e) => {
  console.log(e, 'I was closed.');
};
const Tips = () => (
  <>
    <Alert
      message="请复制好您的密钥"
      description="请复制好您的密钥,为了安全考虑,离开此页面之后,当前生成的密钥就会被彻底删除"
      type="error"
      closable
      onClose={onClose}
    />
  </>
);




/* export default function getPairKey() {
  useEffect(()=>{
    fetch('http://localhost:3000/getPairKey')
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
    })
  },[])

  return (
    <div>getPairKey</div>
  )
} */

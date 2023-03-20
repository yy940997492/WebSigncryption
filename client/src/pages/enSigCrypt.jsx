/*
 * @Author: CUIT渊
 * @Date: 2022-11-04 12:14:51
 * @LastEditTime: 2022-11-07 20:05:09
 * @FilePath: \client\src\pages\enSigCrypt.jsx
 */

import { Button, Form, Input, Select ,Descriptions,Alert,Space} from 'antd';
import React, { useState } from 'react';
const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Tips = () => (
    <>
      <Alert
        message="请复制保存好您的c,r,s"
        description="请复制保存好您的c,r,s,可以通过任何渠道发送给接收者,他将使用此c,r,s组合验证签密"
        type="error"
        closable
      />
    </>
  );



const App = () => {
  const [form] = Form.useForm();
  const[enSig,setEnSig] = useState(null)
  const onFinish = (values) => {
    //console.log(values);
    fetch('http://localhost:3000/enSig',{
        method:"POST",
        body:JSON.stringify(values),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json()).then(res=>{
        console.log("res:",res)
        setEnSig(res)
        console.log("enSig:",enSig)
    })
  };
  const onReset = () => {
    form.resetFields();
  };

  const EnSigResult = ()=>{
    return(
        <div>
        <Descriptions
            bordered = "true"
            size = "middle"
            title="签密数据"
        >
            <Descriptions.Item label="随机数x" span="3">{enSig.x} </Descriptions.Item>
            <Descriptions.Item label="密钥k1" span="3">{enSig.k1} </Descriptions.Item>
            <Descriptions.Item label="密钥k2" span="3">{enSig.k2} </Descriptions.Item>
            <Descriptions.Item label="密文c" span="3">{enSig.c} </Descriptions.Item>
            <Descriptions.Item label="消息哈希r" span="3">{enSig.r} </Descriptions.Item>
            <Descriptions.Item label="签密s" span="3">{enSig.s} </Descriptions.Item>
        </Descriptions>
        <br />
        <br />
        <Tips/>
        </div>
    )
}

const NoResult = ()=>{
    return(
        <div>
            <Alert
      message="等待签密"
      type="warning"
      action={
        <Space>
          <Button size="small" type="ghost">
            Done
          </Button>
        </Space>
      }
      closable
    />
        </div>
    )
    
}

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="msg"
        label="msg:需要签密的数据"
        size = "large"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TextArea rows={4}/>
      </Form.Item>

      <Form.Item
        name="yb"
        label="yb:接收方的公钥"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input/>
      </Form.Item>
      
      <Form.Item
        name="xa"
        label="xa:发送方的私钥"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="SCS"
        label="签密模式"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          <Select.Option value="1">SCS1</Select.Option>
          <Select.Option value="2">SCS2</Select.Option>
        </Select>
      </Form.Item>
      

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          签密
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
      <div>
      {enSig ? <EnSigResult/> : <NoResult/>}
      </div>
    </Form>
  );
};
export default App;

/* export default function enSigCrypt() {
  const [key,setKey] = useState("")
  useEffect(()=>{
    fetch('http://localhost:3000/enSig')
    .then((res)=>res.json())
    .then((data)=>{
      setKey(data)
    })
  },[])
  console.log(key)

  

  return (
    <div>enSigCrypt</div>
  )
} */

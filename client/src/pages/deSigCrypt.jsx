/*
 * @Author: CUIT渊
 * @Date: 2022-11-04 19:12:29
 * @LastEditTime: 2022-11-07 20:04:27
 * @FilePath: \client\src\pages\deSigCrypt.jsx
 */
import { Button, Form, Input, Select ,Descriptions,Alert} from 'antd';
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
        message="请查看验证结果verify字段"
        description="若显示verify success则表明签密验证通过,若显示verify fail则表明签密被篡改"
        type="error"
        closable
      />
    </>
  );



const App = () => {
  const [form] = Form.useForm();
  const[deSig,setDeSig] = useState(null)
  const onFinish = (values) => {
    console.log(values);
    fetch('http://localhost:3000/deSig',{
        method:"POST",
        body:JSON.stringify(values),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json()).then(res=>{
        console.log("res:",res)
         setDeSig(res)
        console.log("enSig:",deSig) 
    })
  };
  const onReset = () => {
    form.resetFields();
  };

  const DeSigResult = ()=>{
    return(
        <div>
        <Descriptions
            bordered = "true"
            size = "middle"
            title="验证数据"
        >
            <Descriptions.Item label="密钥dk1" span="3">{deSig.dk1} </Descriptions.Item>
            <Descriptions.Item label="密钥dk2" span="3">{deSig.dk2} </Descriptions.Item>
            <Descriptions.Item label="明文消息m" span="3">{deSig.m} </Descriptions.Item>
            <Descriptions.Item label="消息哈希dr" span="3">{deSig.dr} </Descriptions.Item>
            <Descriptions.Item label="验证结果verify" span="3">{deSig.verify} </Descriptions.Item>
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
            <p>等待验证签密</p>
        </div>
    )
    
}

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="ya"
        label="ya:发送方的公钥"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="xb"
        label="xb:接收方的私钥"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="c"
        label="c:密文"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TextArea rows={4}/>
      </Form.Item>

      <Form.Item
        name="r"
        label="r:明文哈希"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="s"
        label="s:签密"
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
          验证
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
      <div>
      {deSig ? <DeSigResult/> : <NoResult/>}
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

import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

const Login = () => {

  return(
    <div className='container'>
      <Form className="login-form">
        <FormItem>
          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
        </FormItem>
        <FormItem>
          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
        </FormItem>
          <Button type="primary" className="login-buttons">Log in</Button>
          <Button type="secondary" className="login-buttons">Sign up</Button>
      </Form>
    </div>
  )
}



export default Login

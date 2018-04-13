import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

const Login = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    props.submitForm(props.history)
  }

  return(
    <div className='container'>
      <Form className="login-form">
        <FormItem>
          <Input name="username" onChange={props.handleChange} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" value={props.username} />
        </FormItem>
        <FormItem>
          <Input name="password" onChange={props.handleChange} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" value={props.password} />
        </FormItem>
          <Button type="primary" className="login-buttons" onClick={handleSubmit} >Log in</Button>
          <Button type="secondary" className="login-buttons">Sign up</Button>
      </Form>
    </div>
  )
}



export default Login

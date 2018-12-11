import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
import Register from './Register'
import '../styles/Login.css'

const FormItem = Form.Item;

const Login = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    props.submitForm()
  }

  const showSignUpFields = () => {
    return <Register handleChange={props.handleChange} form={props.form} />
  }

  return(
    <div id='login-background'>
      <div className='container'>
        <Form className="login-form" onSubmit={handleSubmit}>
          <h1>{!props.signingUp ? "Member Login" : "Register"}</h1>
          <FormItem>
            <Input name="username"
              onChange={props.handleChange}
              prefix={<Icon type="user"
              style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username" value={props.form.username} />
          </FormItem>
          <FormItem>
            <Input name="password" onChange={props.handleChange} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" value={props.form.password} />
          </FormItem>
            { props.signingUp && showSignUpFields() }
            { props.signingUp ?
              <Button type="primary" htmlType="submit" className="login-buttons" onClick={handleSubmit} >Register</Button> :
              <Button type="primary" htmlType="submit" className="login-buttons" onClick={handleSubmit} >Log in</Button> }
            { !props.signingUp ?
                <p className="login-buttons" onClick={props.signUpClick} >Create your account <Icon type="arrow-right" style={{ color: 'rgba(0,0,0,.25)' }} /> </p> :
                <p className="login-buttons" onClick={props.signUpClick} >Back to login </p>}
        </Form>
      </div>
    </div>
  )
}



export default Login

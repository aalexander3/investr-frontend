import React from 'react'
import { Form, Icon, Input, Button, Select, InputNumber } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const Login = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    props.submitForm(props.history)
  }

  const showSignUpFields = () => {
    return(
      <div>
        <FormItem>
          <Input name="password_confirmation" onChange={props.handleChange} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" value={props.form.password_confirmation} />
        </FormItem>
        <FormItem>
          <Input name="name" onChange={props.handleChange} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Full name" value={props.form.name} />
        </FormItem>
        <FormItem>
          <Input name="mission" onChange={props.handleChange} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="Enter your mission" value={props.form.mission} />
        </FormItem>
        <FormItem>
          <Input name="description" onChange={props.handleChange} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter a short bio" value={props.form.description} />
        </FormItem>
        <FormItem>
          <Input name="interests" onChange={props.handleChange} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter a few interests" value={props.form.interests} />
        </FormItem>
        <FormItem>
          <Input name="url" onChange={props.handleChange} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Website URL" value={props.form.url} />
        </FormItem>
        <FormItem>
          <Input name="logo" onChange={props.handleChange} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Photo URL" value={props.form.logo} />
        </FormItem>
        <Select name="type" defaultValue="startup" style={{ width: 120 }} onChange={props.onDropDownChange}>
          <Option value="startup">Startup</Option>
          <Option value="investor">Investor</Option>
        </Select>
      </div>
    )
  }

  return(
    <div id='login-background'>
      <div className='container'>
        <Form className="login-form">
          <FormItem>
            <Input name="username" onChange={props.handleChange} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" value={props.form.username} />
          </FormItem>
          <FormItem>
            <Input name="password" onChange={props.handleChange} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" value={props.form.password} />
          </FormItem>
            {props.signingUp ? showSignUpFields() : null}
            {props.signingUp ? <Button type="primary" className="login-buttons" onClick={handleSubmit} >Register</Button> : <Button type="primary" className="login-buttons" onClick={handleSubmit} >Log in</Button>}
            <Button type="secondary" className="login-buttons" onClick={props.signUpClick} >Sign up</Button>
        </Form>
      </div>
    </div>
  )
}



export default Login

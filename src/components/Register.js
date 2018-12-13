import React, { Fragment} from 'react'
import { Form, Icon, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;


const Register = props => {
  return (
    <Fragment>
      <FormItem>
        <Input name="password_confirmation" onChange={props.handleChange} prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" value={props.form.password_confirmation} />
      </FormItem>
      <FormItem>
        <Input name="name" onChange={props.handleChange} prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Full name" value={props.form.name} />
      </FormItem>
      <FormItem>
        <Input name="mission" onChange={props.handleChange} prefix={<Icon type="profile" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="Enter your mission" value={props.form.mission} />
      </FormItem>
      <FormItem>
        <Input name="description" onChange={props.handleChange} prefix={<Icon type="profile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter a short bio" value={props.form.description} />
      </FormItem>
      <FormItem>
        <Input name="interests" onChange={props.handleChange} prefix={<Icon type="like" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter a few interests" value={props.form.interests} />
      </FormItem>
      <FormItem>
        <Input name="url" onChange={props.handleChange} prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Website URL" value={props.form.url} />
      </FormItem>
      <FormItem>
        <Input name="logo" onChange={props.handleChange} prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Photo URL" value={props.form.logo} />
      </FormItem>
      <Select name="type" defaultValue="startup" style={{ width: 120, marginRight: '1em' }} onChange={props.onDropDownChange}>
        <Option value="startup">Startup</Option>
        <Option value="investor">Investor</Option>
      </Select>
    </Fragment>
  )
}

export default Register

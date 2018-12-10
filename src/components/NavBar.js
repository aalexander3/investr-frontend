import React from 'react'
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'
import '../styles/Navbar.css'

const NavBar = (props) => {

return (
    <Menu mode="horizontal">
      <Menu.Item key="profile">
        <Link to='/settings'><Icon type="idcard" />Profile</Link>
      </Menu.Item>
      <Menu.Item key="match">
        <Link to='/'><Icon type="rocket" /> Match Maker </Link>
      </Menu.Item>
      <span>
        <h1 id='investr-logo'>INVESTR</h1>
      </span>
      <Menu.Item key="message" style={{"float":"right"}}>
        <Link to='/messages'><Icon type="coffee" />Messages</Link>
      </Menu.Item>
      <Menu.Item key="login" style={{"float":"right"}}>
        { (props.loggedIn) ? <Link to='/login' onClick={props.logout} ><Icon type="lock" />Logout</Link> : <Link to='/login'><Icon type="unlock" />Login</Link> }
      </Menu.Item>
    </Menu>
  )
}

export default NavBar

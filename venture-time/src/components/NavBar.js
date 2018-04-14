import React from 'react'
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'


const NavBar = (props) => {

return(
  <div>
    <Menu mode="horizontal">
      <Menu.Item key="profile">
        <Link to='/settings'><Icon type="like" />Profile</Link>
      </Menu.Item>
      <Menu.Item key="match">
        <Link to='/'><Icon type="rocket" /> Match Maker </Link>
      </Menu.Item>
      <Menu.Item key="message" style={{"float":"right"}}>
        <Link to='/messages'><Icon type="coffee" />Messages</Link>
      </Menu.Item>
      <Menu.Item key="login" style={{"float":"right"}}>
        { (props.loggedIn) ? <Link to='/login' onClick={props.logout} ><Icon type="coffee" />Logout</Link> : <Link to='/login'><Icon type="coffee" />Login</Link> }
      </Menu.Item>
    </Menu>
  </div>
)

}

export default NavBar

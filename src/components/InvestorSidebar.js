import React from 'react'
import { Layout, Avatar, List } from 'antd';
const { Sider } = Layout

const InvestorSidebar = props => {

  return (
    <div id='investor-card-sider' >
      <Sider style={{background: '#EDEDEF'}}>
        <h3>My Connections</h3>
        <List
          itemLayout="horizontal"
          dataSource={props.connections}
          renderItem={item => (
            <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.logo} />}
              title={<a href={item.url}>{item.name}</a>}
            />
            </List.Item>
          )}
        />
      </Sider>
    </div>
  )
}


export default InvestorSidebar

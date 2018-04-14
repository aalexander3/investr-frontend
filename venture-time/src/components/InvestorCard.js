import React from 'react'
import { Layout, Card, Avatar, Icon, Calendar, Row, Col, List} from 'antd';
const { Header, Content, Sider, Footer } = Layout
const { Meta } = Card;

const InvestorCard = (props) => {

  const data = [
      {
        title: 'Company 1',
      },
      {
        title: 'Company 2',
      },
      {
        title: 'Company 3',
      },
      {
        title: 'Company 4',
      },
    ];


  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  // make stuff happen here
  return(
    <div>
      <Layout hasSider={true}>
      <Content>
        <div className="card-banner">
            <Header className="card-header">
              {(props.attributes) ? <img id="card-avatar" src={props.attributes.logo}/> : null}
              <h1>{props.attributes.name}</h1>
              <p>{props.attributes.mission}</p>
            </Header>
        </div>

        <div id="row-wrapper">
          <Row type="flex" justify="space-around" align="middle">
            <Col span={12}>
              <Card
                style={{ width: 300 }}
                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
              >
                <Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={props.attributes.name}
                  description={props.attributes.description}
                />

              </Card>
            </Col>
            <Col span={12}>
              <div className="calendar-div" style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
              </div>
            </Col>
          </Row>
        </div>
      </Content>
      <Sider style={{ overflow: 'scroll', background: '#EDEDEF'}}>
        <h3>My Connections</h3>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{item.title}</a>}
            />
            </List.Item>
          )}
        />
      </Sider>
    </Layout>
    </div>
  )
}

export default InvestorCard

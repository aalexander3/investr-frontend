import React from 'react'
import withAuth from '../HOC/withAuth'
import StartUpList from "./StartUpList.js"
import '../styles/Match.css'

import { Layout } from 'antd';
const { Header } = Layout


const MatchPage = ({username, investors, startUps, currentUser }) => {

  return (
    <div style={{margin:'1% 4%'}}>
      <Header style={{background: 'white'}}>
        {currentUser.type === 'investor' ? <h1>Your startups favorite startups</h1> : <h1>I'm an investor, invested in investing</h1>}
      </Header>
      <StartUpList username={username} investors={investors} startUps={startUps} currentUser={currentUser}/>
    </div>
  )
}

export default withAuth(MatchPage)

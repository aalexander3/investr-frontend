import React from 'react'
import withAuth from '../HOC/withAuth'

import StartUpList from "./StartUpList.js"

const MatchPage = (props) => {

  return(
    <div>
      <StartUpList username={props.username} investors={props.investors} startUps={props.startUps} currentUser={props.currentUser}/>
    </div>
  )
}

export default withAuth(MatchPage)

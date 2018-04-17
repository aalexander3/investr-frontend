import React from 'react'

import StartUpList from "./StartUpList.js"

const MatchPage = (props) => {

  // findUserName = () => {
  //   props.investors.map(investor => {return investor.username.includes(props.username)})
  // }

  return(
    <div>
      <StartUpList username={props.username} investors={props.investors} startUps={props.startUps} currentUser={props.currentUser}/>
    </div>
  )
}



export default MatchPage

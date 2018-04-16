import React from 'react'

import StartUpList from "./StartUpList.js"

const MatchPage = (props) => {

  return(
    <div>
      <StartUpList username={props.username}/>
    </div>
  )
}



export default MatchPage

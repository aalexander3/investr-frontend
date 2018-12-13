import React from 'react'
import StartUpCard from "./StartUpCard.js"


const StartUpList = ({startUps, username, currentUser}) => {

  const makeStartUpCards = () => {
    return startUps.map(startUp => <StartUpCard
      key={startUp.id}
      startUp={startUp}
      username={username}
      currentUser={currentUser} />)
  }

  return(
    <div className='start-up-container'>
      {makeStartUpCards()}
    </div>
  )
}

export default StartUpList

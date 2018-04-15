import React from "react"

const Filter = props => {
  return(
    <div>
      Filter by Name:<input type="text" onChange={props.onChange}/>
    </div>
  )
}

export default Filter

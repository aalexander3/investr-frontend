import React from "react"
import { Input } from 'antd'

const Search = Input.Search;

const Filter = props => {
  return(
    <div className='filter-search'>
      <Search onChange={props.onChange} placeholder='Search by name' />
    </div>
  )
}

export default Filter

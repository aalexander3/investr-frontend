import React from "react"
import { Select } from 'antd'
const Option = Select.Option;

class DropDown extends React.Component {


  render(){
    return (
      <div className='filter-search'>
        <Select defaultValue='all' onChange={this.props.onChange}>
          <Option value="all"  >All Fields</Option>
          <Option value="Technology"  >Technology</Option>
          <Option value="Food"  >Food</Option>
          <Option value="Finance"  >Finance</Option>
          <Option value="Healthcare"  >Healthcare</Option>
        </Select>
      </div>
    )
  }
}

export default DropDown

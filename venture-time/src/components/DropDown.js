import React from "react"

class DropDown extends React.Component {


  render(){
    return (
      <div>
        Search By Field:
        <select onChange={this.props.onChange}>
          <option value="all"  >Select All</option>
          <option value="Technology"  >Technology</option>
          <option value="Food"  >Food</option>
          <option value="Finance"  >Finance</option>
          <option value="Healthcare"  >Healthcare</option>
        </select>
      </div>
    )
  }
}

export default DropDown

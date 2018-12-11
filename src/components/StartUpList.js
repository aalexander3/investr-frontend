import React from 'react'
import StartUpCard from "./StartUpCard.js"
import Filter from "./Filter.js"
import DropDown from "./DropDown.js"
import { Divider } from 'antd'

class StartUpList extends React.Component {

  state = {
    value: "",
    filteredStartUps: [],
    dropDownVal: ""
  }

  componentDidMount(){
    if (this.props.currentUser.type === "start_up") {
      this.setState({
        filteredStartUps: this.props.investors
      })
    } else {
        this.setState({
          filteredStartUps: this.props.startUps
        })
    }
  }


  makeStartUpCards = () => {
    return this.state.filteredStartUps.map(startUp => <StartUpCard
      key={startUp.id}
      startUp={startUp}
      username={this.props.username}
      currentUser={this.props.currentUser} />)
  }

  onChange = (event) => {
    this.setState({
      value: event.target.value
    }, () => {
      if (this.props.currentUser.type === "investor") {
        this.setState({
          filteredStartUps: this.props.startUps.filter(this.filterObject)
        })
      } else {
          this.setState({
            filteredStartUps: this.props.investors.filter(this.filterObject)
          })
        }
    })
  }

  filterObject = obj => obj.attributes.name.toLowerCase().includes(this.state.value)

  onDropDownChange = event => {
    if (event === 'all') {
      this.setState({
        dropDownVal: event,
        filteredStartUps: this.props.startUps
      })
    } else {
      this.setState({
        dropDownVal: event,
        filteredStartUps: this.props.startUps.filter(startUp => startUp.attributes.field.toLowerCase() === event.toLowerCase())
      })
    }
  }

  render() {
    return(
      <div>
        <Filter onChange={this.onChange} />
        {this.props.currentUser.type === 'investor'? <DropDown onChange={this.onDropDownChange}/> : null}
        <Divider />
        <div className='start-up-container'>
          {this.makeStartUpCards()}
        </div>
      </div>
    )
  }
}

export default StartUpList

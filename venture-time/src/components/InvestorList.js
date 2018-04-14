import React from 'react'
import InvestorCard from './InvestorCard'


const URL = "http://localhost:3000/api/v1/investors"

export default class InvestorList extends React.Component {

  state = {
    investors: []
  }

  componentDidMount() {
    this.fetchUser()
  }

  fetchUser = () => {
    fetch(URL)
      .then(resp => resp.json())
      .then(investors => this.setState({investors: investors.data }))
  }

  filterUser = () => {
    // filter by username instead

    return this.state.investors.filter(investor => investor.attributes.username === this.props.username)[0]
  }

  makeInvestorCard = () => {
    if (this.props.username && (this.state.investors.length > 0)){
      const filteredUser = this.filterUser()
      return <InvestorCard investor={filteredUser} attributes={filteredUser.attributes}/>
    }
  }

  render(){
    return(
      <div>
        {this.makeInvestorCard()}
      </div>
    )
  }

}

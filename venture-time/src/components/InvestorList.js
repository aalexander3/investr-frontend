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
      .then(investors => this.setState({ investors: investors.data }))
  }

  filterUser = (id) => {
    // filter by username instead
    return this.state.investors.filter(investor => parseInt(investor.id) === id)[0]
  }

  makeInvestorCard = () => {
    if (this.state.investors.length > 0){
      const filteredUser = this.filterUser(1)
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

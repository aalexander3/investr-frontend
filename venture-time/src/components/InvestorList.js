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
    const filtered = this.state.investors.filter(investor => investor.id == id)
    console.log(filtered);
    return filtered
  }

  makeInvestorCard = () => {
    if (this.state.investors !== []){
      const filteredUser = this.filterUser(1)
      return <InvestorCard investor={filteredUser}/>
    }
  }

  render(){
    console.log(this.state);
    return(
      <div>
        HEY WORLD HERE I COME
        {this.makeInvestorCard()}
      </div>
    )
  }

}

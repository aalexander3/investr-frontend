import React from 'react'
import InvestorCard from './InvestorCard'


export default class InvestorList extends React.Component {

  makeInvestorCard = () => {
    if (this.props.username){
      const filteredUser = this.props.filterUser()
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

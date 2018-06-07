import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'

/*
 * Create component.
 */

class CreateCalendar extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts

    this.hasCalKey = this.contracts.CalendarFactory.methods.hasCalendar.cacheCall(...[this.props.accounts[0]]);

    //console.log('this.contracts', this.contracts);
    //console.log('account', this.props.accounts[0]);
    //this.createNewCalendar = this.createNewCalendar.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    //solidity contract function to create new calendar
    //console.log(this.contracts);
    this.contracts.CalendarFactory.methods.createNewCalendar.cacheSend(...[this.props.accounts[0]]);
  }

  createNewCalendar(calendarBool) {
    if (calendarBool) {
      return <h4>Use the methods below to interact with your calendar:</h4>
    } else {
      return <button className="pure-button" type="button" onClick={this.handleSubmit}>Create New Calendar</button>
    }
  }

  render() {
    // CalendarFactory Contract is not yet intialized.
   if(!this.props.contracts["CalendarFactory"].initialized) {
     return (
       <span>Initializing...</span>
     )
   }

   // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
   if(!(this.hasCalKey in this.props.contracts["CalendarFactory"]["hasCalendar"])) {
     return (
       <span>Fetching...</span>
     )
   }

   var hasCalendar = this.props.contracts["CalendarFactory"]["hasCalendar"][this.hasCalKey].value

   return (
     <div>
      { this.createNewCalendar(hasCalendar) }
     </div>
   )
  }
}

CreateCalendar.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    contracts: state.contracts
  }
}

export default drizzleConnect(CreateCalendar, mapStateToProps);

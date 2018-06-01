import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import ContractData from './ContractData'

/*
 * Create component.
 */

class EventsList extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts

    // Get the contract ABI
    //const abi = this.contracts["Calendar"].abi;

    // Fetch initial value of Events Count from chain and return cache key for reactive updates.
    this.eventsListLengthDataKey = this.contracts["Calendar"].methods["getCalendarEventsCount"].cacheCall(...[]);
    /*
    // Fetch initial values of event ids from calendarEventsList array from chain and return cache key for reactive updates.
    this.calendarEventsListIdsKeys[] =
      for (var i = 0; i < eventsCount; i++) {
        this.contracts["Calendar"].methods["calendarEventsList"].cacheCall(...[i]);
      }
      */
      /*
    // Iterate over abi for getCalendarEventsCount function.
    for (var i = 0; i < abi.length; i++) {
      if (abi[i].name === "getCalendarEventsCount") {
          this.getCalendarEventsCountABI = abi[i]
          //this.fnABI = abi[i]

          break
      }
    }
*/
    //console.log('EventsList getCalendarEventsCount cacheCall data key: ', this.eventsListLengthDataKey);
    //console.log('this.props.contracts', this.props.contracts);
  }

  render() {

    // Contract is not yet intialized.
    if(!this.props.contracts["Calendar"].initialized) {
      return (
        <span>Initializing...</span>
      )
    }

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if(!(this.eventsListLengthDataKey in this.props.contracts["Calendar"]["getCalendarEventsCount"])) {
      return (
        <span>Fetching...</span>
      )
    }

    let eventsCount = this.props.contracts["Calendar"]["getCalendarEventsCount"][this.eventsListLengthDataKey].value;
    //console.log('logging eventsCount:', eventsCount);
    /*
    for (var i = 0; i < eventsCount; i++) {
      <ContractData contract="Calendar" method="getCalendarEvent" methodArgs={[1002]} />
    }
    */

    return null;
  }
}

EventsList.contextTypes = {
  drizzle: PropTypes.object
}

/*
 * Export connected component.
 try moving this stuff to container component
 */


/*
const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(EventsList, mapStateToProps)
*/
export default EventsList;

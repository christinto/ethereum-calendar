import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ContractData } from 'drizzle-react-components'

/*
 * Create component.
 */

class EventsList extends Component {
  constructor(props, context) {
    super(props)

    // contracts data from drizzleConnect
    this.contracts = context.drizzle.contracts

    // Fetch initial values of event ids array from chain and return cache key for reactive updates.
    this.calendarEventsListDataKey = this.contracts.Calendar.methods.getAllCalendarEvents.cacheCall(...[]);

  }

  render() {
    // Contract is not yet intialized.
    if(!this.props.contracts["Calendar"].initialized) {
      return (
        <span>Initializing...</span>
      )
    }

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if(!(this.calendarEventsListDataKey in this.props.contracts["Calendar"]["getAllCalendarEvents"])) {
      return (
        <span>Fetching...</span>
      )
    }
    // use cache key to save events ids to array
    let eventIds = this.props.contracts["Calendar"]["getAllCalendarEvents"][this.calendarEventsListDataKey].value;
    //console.log('event ids: ', eventIds);

    return (
      <div className="EventssList">
        { eventIds.map(id =>
          <li key={id} >
            <p><strong>Event {id}:</strong></p>
            <ContractData contract="Calendar" method="getCalendarEvent" methodArgs={[id]} />
          </li>
        ) }
      </div>
    );
  }
}

EventsList.contextTypes = {
  drizzle: PropTypes.object
}

export default EventsList;

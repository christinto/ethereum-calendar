import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
 * Create component.
 */

class CalendarContainer extends Component {
  constructor(props, context) {
    super(props)

    // contracts data from drizzleConnect
    this.contracts = context.drizzle.contracts

    // Fetch initial values of event detaisl from chain and return cache key for reactive updates.
    this.calendarEventsDataKeys = this.props.eventIds.map(id => {
      return this.contracts.Calendar.methods.getCalendarEvent.cacheCall(id);
    });

  }

  render() {
    // Contract is not yet intialized.
    if(!this.props.contracts["Calendar"].initialized) {
      return (
        <span>Initializing...</span>
      )
    }
    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    let keysNotFound = this.calendarEventsDataKeys.some(key => {
      return !(key in this.props.contracts["Calendar"]["getCalendarEvent"]);
    });

    if (keysNotFound) {
      return (
        <span>Fetching...</span>
      )
    }

    return (
      null
    );
  }
}

CalendarContainer.contextTypes = {
  drizzle: PropTypes.object
}

export default CalendarContainer;

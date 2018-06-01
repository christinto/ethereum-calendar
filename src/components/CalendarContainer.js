import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calendar from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
//import logo from "../../ethereumlogo.svg";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

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

    // save the event data into an array of objects
    let eventObjects = this.calendarEventsDataKeys.map(key => {
      return (
        {
          // id needs to match the same one from the eventIds prop
          id: this.props.contracts["Calendar"]["getCalendarEvent"][key].value.title,
          title: this.props.contracts["Calendar"]["getCalendarEvent"][key].value.title,
          // start and end need to be converted to Date objects
          start: this.props.contracts["Calendar"]["getCalendarEvent"][key].value.start,
          end: this.props.contracts["Calendar"]["getCalendarEvent"][key].value.end,
          desc: this.props.contracts["Calendar"]["getCalendarEvent"][key].value.desc,
        }
      )
    })

    console.log('event objects: ', eventObjects);

    return (
      <div className="pure-u-1-1">
        <Calendar
          defaultDate={new Date()}
          defaultView="month"
          events={ eventObjects } // what to make this
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

CalendarContainer.contextTypes = {
  drizzle: PropTypes.object
}

export default CalendarContainer;

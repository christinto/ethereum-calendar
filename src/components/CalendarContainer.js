import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calendar from "react-big-calendar";
import moment from "moment";
import { drizzleConnect } from 'drizzle-react'

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

    // Show a loading spinner for future updates.
    var pendingSpinner = this.props.contracts["Calendar"].synced ? '' : ' 🔄'

    //console.log('calendar events keys', this.calendarEventsDataKeys);

    // save the event data into an array of objects
    let eventObjects = this.calendarEventsDataKeys.map(key => {
      // start and end need to be converted to Date objects
      // id needs to match the same one from the eventIds prop
      //id: this.props.contracts["Calendar"]["getCalendarEvent"][key].value.title,
      return (
        {
          id: this.props.contracts["Calendar"]["getCalendarEvent"][key].value.id,
          title: this.props.contracts["Calendar"]["getCalendarEvent"][key].value.title,
          start: new Date(this.props.contracts["Calendar"]["getCalendarEvent"][key].value.start * 1000),
          end: new Date(this.props.contracts["Calendar"]["getCalendarEvent"][key].value.end * 1000),
          desc: this.props.contracts["Calendar"]["getCalendarEvent"][key].value.desc,
        }
      )
    })

    //console.log('event objects: ', eventObjects);

    return (
      <div className="pure-u-1-1">
        { pendingSpinner }
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

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(CalendarContainer, mapStateToProps);

import React, { Component } from 'react'
import { AccountData, ContractForm, ContractData } from 'drizzle-react-components'
import EventsList from '../../components/EventsListContainer'


import Calendar from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
//import logo from "../../ethereumlogo.svg";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class Home extends Component {

  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <h1 className="App-title">Ethereum Calendar</h1>
          </div>

          <div className="pure-u-1-1">
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="2" />

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <p><strong>Calendar events count</strong>: <ContractData contract="Calendar" method="getCalendarEventsCount" /></p>

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Add Event to Calendar</h2>
            <ContractForm contract="Calendar" method="createNewCalendarEvent" labels={['Title', 'Start', 'End', 'Description']}/>

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Update Calendar Event</h2>
            <ContractForm contract="Calendar" method="updateCalendarEvent" labels={['id', 'Title', 'Start', 'End', 'Description']}/>

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Delete Calendar Event</h2>
            <ContractForm contract="Calendar" method="deleteCalendarEvent" labels={['id']}/>

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>List of Calendar Events</h2>
            <EventsList />

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <Calendar
              defaultDate={new Date()}
              defaultView="month"
              events={[]} // what to make this
              style={{ height: "100vh" }}
            />
          </div>
        </div>
      </main>
    )
  }
}

export default Home

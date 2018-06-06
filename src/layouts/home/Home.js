import React, { Component } from 'react'
import { AccountData, ContractForm, ContractData } from 'drizzle-react-components'
import EventsList from '../../components/EventsListContainer'
import EventForm from '../../components/EventFormContainer'

import Calendar from "react-big-calendar";
import moment from "moment";

import Collapsible from 'react-collapsible';

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
            <Collapsible trigger="Active Account Info">
              <AccountData accountIndex="0" units="ether" precision="2" />

              <br/><br/>

              <p><strong>Calendar events count</strong>: <ContractData contract="Calendar" method="getCalendarEventsCount" /></p>

              <br/><br/>
            </Collapsible>
          </div>

          <div className="pure-u-1-1">
            <Collapsible trigger="Add Event to Calendar">
              <EventForm contract="Calendar" method="createNewCalendarEvent" labels={['Title', 'Start', 'End', 'Description']}/>

              <br/><br/>
            </Collapsible>
          </div>

          <div className="pure-u-1-1">
            <Collapsible trigger="Update Calendar Event">
              <EventForm contract="Calendar" method="updateCalendarEvent" labels={['id', 'Title', 'Start', 'End', 'Description']}/>

              <br/><br/>
            </Collapsible>
          </div>

          <div className="pure-u-1-1">
            <Collapsible trigger="Delete Calendar Event">
              <ContractForm contract="Calendar" method="deleteCalendarEvent" labels={['id']}/>

              <br/><br/>
            </Collapsible>
          </div>

          <div className="pure-u-1-1">
            <EventsList />

            <br/><br/>
          </div>
        </div>
      </main>
    )
  }
}

export default Home

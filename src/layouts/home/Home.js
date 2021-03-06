import React, { Component } from 'react'
import { AccountData, ContractForm, ContractData } from 'drizzle-react-components'
import EventsList from '../../components/EventsList'
import EventForm from '../../components/EventForm'
import CreateCalendar from '../../components/CreateCalendar'
import PropTypes from 'prop-types'

import Calendar from "react-big-calendar";
import moment from "moment";

import Collapsible from 'react-collapsible';
import ethereumlogo from '../../ethereumlogo.svg';

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class Home extends Component {

  render() {

    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <img src={ethereumlogo} className="logo" alt="logo" /><h1 className="title">Blockchain Powered Calendar</h1>
          </div>
{/*}
          <div className="pure-u-1-1">
            <CreateCalendar />
          </div>
*/}
          <div className="pure-u-1-4">
            <Collapsible trigger="Active Account Info">
              <AccountData accountIndex="0" units="ether" precision="2" />
              <p><strong>Calendar events count</strong>: <ContractData contract="Calendar" method="getCalendarEventsCount" /></p>
            </Collapsible>
          </div>

          <div className="pure-u-1-4">
            <Collapsible trigger="Add Event to Calendar">
              <EventForm contract="Calendar" method="createNewCalendarEvent" labels={['Title', 'Start', 'End', 'Description']}/>

            </Collapsible>
          </div>

          <div className="pure-u-1-4">
            <Collapsible trigger="Update Calendar Event">
              <EventForm contract="Calendar" method="updateCalendarEvent" labels={['id', 'Title', 'Start', 'End', 'Description']}/>


            </Collapsible>
          </div>

          <div className="pure-u-1-4">
            <Collapsible trigger="Delete Calendar Event">
              <ContractForm contract="Calendar" method="deleteCalendarEvent" labels={['id']}/>


            </Collapsible>
          </div>
          <br/><br/><br/>

          <div className="pure-u-1-1">
            <EventsList />

            <br/><br/>
          </div>

        </div>
      </main>
    )
  }
}

Home.contextTypes = {
  drizzle: PropTypes.object
}

export default Home

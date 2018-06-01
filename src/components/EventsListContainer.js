import { drizzleConnect } from 'drizzle-react'
import EventsList from './EventsList.js'

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

const EventsListContainer = drizzleConnect(EventsList, mapStateToProps);

export default EventsListContainer;

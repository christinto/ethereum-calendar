import { drizzleConnect } from 'drizzle-react'
import EventForm from './EventForm.js'

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

const EventFormContainer = drizzleConnect(EventForm, mapStateToProps);

export default EventFormContainer;

import { drizzleConnect } from 'drizzle-react'
import CalendarContainer from './CalendarContainer.js'

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

const CalendarContainerContainer = drizzleConnect(CalendarContainer, mapStateToProps);

export default CalendarContainerContainer;

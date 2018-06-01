import Calendar from './../build/contracts/Calendar.json'
import CalendarFactory from './../build/contracts/CalendarFactory.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    Calendar,
    CalendarFactory
  ],
  events: {
    Calendar: [
      'NewCalendarEventAdded',
      'CalendarEventUpdated',
      'CalendarEventDeleted'
    ],
    CalendarFactory: [
      'NewCalendarAdded',
      'CalendarDeleted'
    ]
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions

pragma solidity ^0.4.18;

import './Calendar.sol';

contract CalendarFactory {
  // An array of all the calendar contract instances
  Calendar[] calendars;

  function createNewCalendar (address own) public {
    calendars.push(new Calendar(address own));
  }
}

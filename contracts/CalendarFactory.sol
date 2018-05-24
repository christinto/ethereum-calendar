pragma solidity ^0.4.18;

import './Calendar.sol';
/*
FUNCTIONS STILL NEED TO BE PERMISSIONED 
*/

contract CalendarFactory {
  // a struct containing a calendar contract plus pointer to keep track of it in array
  struct CalendarStruct {
    Calendar cal;
    uint index;
  }
  // this maps the addresses of the OWNERS of each calendar
  mapping (address => CalendarStruct) public calendars;
  // addresses of the owners of the calendars
  address[] public calendarsList;

  // event for new calendar added
  event NewCalendarAdded (address owner);
  event CalendarDeleted (address owner);

  // checks if a user with a given address already has a calendar
  function hasCalendar (address calendarOwnerAddress) public constant returns (bool isIndeed) {
    if (calendarsList.length == 0) return false;
    return (calendarsList[calendars[calendarOwnerAddress].index] == calendarOwnerAddress);
  }

  // Returns the count of calendars stored in calendarsList array
  function getCalendarCount() public constant returns (uint) {
    return calendarsList.length;
  }

  function createNewCalendar (address calendarOwnerAddress) public returns (bool success) {
    // user can only have 1 calendar per address
    if (hasCalendar(calendarOwnerAddress)) revert();
    calendars[calendarOwnerAddress].cal = new Calendar(calendarOwnerAddress);
    calendars[calendarOwnerAddress].index = calendarsList.push(calendarOwnerAddress) - 1;
    emit NewCalendarAdded (calendarOwnerAddress);
    return true;
  }

  function deleteCalendar (address calendarOwnerAddress) public returns (bool success) {
    // make sure thers actually a calendar to delete
    if (!hasCalendar(calendarOwnerAddress)) revert();
    // ONLY THE OWNER OF A CALENDAR CAN DELETE IT!!!
    if (calendarOwnerAddress != msg.sender) revert();

    uint rowToDelete = calendars[calendarOwnerAddress].index;
    address keyToMove = calendarsList[calendarsList.length - 1];

    calendarsList[rowToDelete] = keyToMove;
    calendars[keyToMove].index = rowToDelete;
    calendarsList.length--;

    emit CalendarDeleted (calendarOwnerAddress);
    return true;
  }
}

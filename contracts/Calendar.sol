pragma solidity ^0.4.18;

/*
FUNCTIONS STILL NEED TO BE PERMISSIONED
*/

contract Calendar {
  // this is the address of the user that instantiates the calendar contract
  address owner;

  // this counter ensures each calendar event is assigned a unique id
  uint idCounter = 1000;

  // this event format matches the format of the React frontend, plus a index pointer
  struct CalendarEvent {
    //uint id;
    // dynamic types can't be passed between contracts use string instead of string
    string title;
    //bool allDay;
    uint start;
    uint end;
    string desc;
    uint index;
  }

  // this maps the id of each calendar, uint is just an id number
  mapping (uint => CalendarEvent) public calendarEvents;
  // ids of the calendars
  uint[] public calendarEventsList;

  // event for new calendar events
  event NewCalendarEventAdded (uint id);
  event CalendarEventUpdated (uint id);
  event CalendarEventDeleted (uint id);


  // modifier to ensure calendar functions only accessible to owner of calendar
  modifier ownerOnly {
    if (msg.sender == owner) {
      _;
    } else {
      revert();
    }
  }
  // Constructor
  function  Calendar (address own) public {
    owner = own;
  }

  // checks if a calendar event exists with a given id
  function eventExists (uint calendarEventId) public constant returns (bool doesIndeed) {
    if (calendarEventsList.length == 0) return false;
    return (calendarEventsList[calendarEvents[calendarEventId].index] == calendarEventId);
  }

  // Returns the count of calendars stored in calendarsList array
  function getCalendarEventsCount() public constant returns (uint) {
    return calendarEventsList.length;
  }
  // CRUD
  function createNewCalendarEvent (string title, uint start, uint end, string desc) public ownerOnly returns (bool success) {
    // a unique id is assigned to each new calendar event. we dont need to check that an event with this id already exists since
    // the id has nothing to do with the properties of the new calendar event
    //if (eventExists(id)) revert();
    CalendarEvent memory newCalendarEvent;

    newCalendarEvent.title = title;
    //newCalendarEvent.allDay = allDay;
    newCalendarEvent.start = start;
    newCalendarEvent.end = end;
    newCalendarEvent.desc = desc;
    // 2 in 1 move here
    newCalendarEvent.index = calendarEventsList.push(idCounter) - 1;

    calendarEvents[idCounter] = newCalendarEvent;

    emit NewCalendarEventAdded (idCounter);
    idCounter++;
    return true;
  }
  // Is this one even necessary?? YES
  function getCalendarEvent (uint idToGet) public ownerOnly constant returns (uint id, string title, uint start, uint end, string desc, uint index) {
    //make sure its actually an event
    if (!eventExists(idToGet)) revert();

    return (
      idToGet,
      calendarEvents[idToGet].title,
      //calendarEvents[idToGet].allDay,
      calendarEvents[idToGet].start,
      calendarEvents[idToGet].end,
      calendarEvents[idToGet].desc,
      calendarEvents[idToGet].index);
  }

  function getAllCalendarEvents () public ownerOnly constant returns (uint[]) {
    return calendarEventsList;
  }

  function updateCalendarEvent (uint idToUpdate, string title, uint start, uint end, string desc) public ownerOnly returns (bool success) {
    //make sure its actually an event
    if (!eventExists(idToUpdate)) revert();

    CalendarEvent memory updatedCalendarEvent;

    updatedCalendarEvent.title = title;
    //updatedCalendarEvent.allDay = allDay;
    updatedCalendarEvent.start = start;
    updatedCalendarEvent.end = end;
    updatedCalendarEvent.desc = desc;
    updatedCalendarEvent.index = calendarEvents[idToUpdate].index;

    calendarEvents[idToUpdate] = updatedCalendarEvent;

    return true;
  }

  function deleteCalendarEvent (uint idToDelete) public ownerOnly returns (bool success) {
    // make sure thers actually a calendar event to delete
    if (!eventExists(idToDelete)) revert();

    uint rowToDelete = calendarEvents[idToDelete].index;
    uint keyToMove = calendarEventsList[calendarEventsList.length - 1];

    calendarEventsList[rowToDelete] = keyToMove;
    calendarEvents[keyToMove].index = rowToDelete;
    calendarEventsList.length--;

    emit CalendarEventDeleted (idToDelete);
    return true;
  }

}

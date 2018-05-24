var Calendar = artifacts.require("./Calendar.sol");

contract('Calendar', accounts => {

  it("should assert true", done => {
    let calendar = Calendar.deployed();
    assert.isTrue(true);
    done();
  });
  // calendar deployed by this address 0x229388615cab46530FDea0cad926ab12BcFF1c82
  // this is the accounts[0] address

  it("getCalendarEventsCount() returns 0 to begin with", () => {
    let calendar;
    return Calendar.deployed().then(instance => {
      calendar = instance;
      return calendar.getCalendarEventsCount();
    }).then((result) => {
      assert.equal(result.toNumber(), 0);
      //console.log(result.toNumber());
      //console.log(result);
    })
  })

  it("createNewCalendarEvent() adds new Calendar event and emits an event", () => {
    let calendar;
    return Calendar.deployed().then(instance => {
      calendar = instance;
      return calendar.createNewCalendarEvent('sample event', false, 600, 800, 'menial bs', { from: accounts[0] });
    }).then((result) => {
      assert.equal(result.logs[0].event, 'NewCalendarEventAdded');
    }).then(() => {
      return calendar.getCalendarEventsCount();
    }).then((result) => {
      //console.log((result));
      assert.equal(result.toNumber(), 1);
      //console.log(result.toNumber());
      //console.log(result);
    })
  })

  it("eventExists detects if someone trys to make a new event with a duplicate id", () => {
    let calendar;
    return Calendar.deployed().then(instance => {
      calendar = instance;
      // idCounter starts at 1000 so the id of the newly added event should be 1000
      return calendar.eventExists(1000);
    }).then((result) => {
      assert.isOk(result);
    })
  })
  // use accounts[1] to send tx since accounts[0] is the owner
  it("createNewCalendarEvent() only works for the owner of the calendar", () => {
    let calendar;
    return Calendar.deployed().then(instance => {
      calendar = instance;
      return calendar.createNewCalendarEvent('imposter event', false, 600, 800, 'menial bs', { from: accounts[1] });
    })
    // it should revert here
  })

  it("createNewCalendarEvent() assigns the correct unique id to second added event", () => {
    let calendar;
    return Calendar.deployed().then(instance => {
      calendar = instance;
      return calendar.createNewCalendarEvent('sample event 2', false, 600, 800, 'menial bs', { from: accounts[0] });
    }).then((result) => {
      assert.equal(result.logs[0].args.id.toNumber(), 1001);
    }).then(() => {
      return calendar.getCalendarEventsCount();
    }).then((result) => {
      //console.log((result));
      assert.equal(result.toNumber(), 2);
      //console.log(result.toNumber());
      //console.log(result);
    })
  })
  // lets delete id 1000
  it("a user can delete events on their calendar", () => {
    let calendar;
    return Calendar.deployed().then(instance => {
      calendar = instance;
      return calendar.deleteCalendarEvent(1000, { from: accounts[0] });
    }).then((result) => {
      //console.log(result);
      assert.equal(result.logs[0].event, 'CalendarEventDeleted');
    }).then(() => {
      return calendar.getCalendarEventsCount();
    }).then((result) => {
      //console.log((result));
      assert.equal(result.toNumber(), 1);
      //console.log(result.toNumber());
      //console.log(result);
    }).then(() => {
      return calendar.eventExists(1000);
    }).then((result) => {
      assert.isNotOk(result);
    })
  })

  it("createNewCalendarEvent() assigns the correct unique id to third added event", () => {
    let calendar;
    return Calendar.deployed().then(instance => {
      calendar = instance;
      return calendar.createNewCalendarEvent('sample event 3', false, 600, 800, 'menial bs', { from: accounts[0] });
    }).then((result) => {
      assert.equal(result.logs[0].args.id.toNumber(), 1002);
    }).then(() => {
      return calendar.getCalendarEventsCount();
    }).then((result) => {
      //console.log((result));
      assert.equal(result.toNumber(), 2);
      //console.log(result.toNumber());
      //console.log(result);
    })
  })
});

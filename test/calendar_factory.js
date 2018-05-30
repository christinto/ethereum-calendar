var CalendarFactory = artifacts.require("./CalendarFactory.sol");

contract('CalendarFactory', accounts => {

  it("should assert true", done => {
    let calendar_factory = CalendarFactory.deployed();
    assert.isTrue(true);
    done();
  });

  // contract deployed in migrations file with a value of 5 in contructor
  it("getCalendarCount() returns 0 to begin with", () => {
    let calendar_factory;
    return CalendarFactory.deployed().then(instance => {
      calendar_factory = instance;
      return calendar_factory.getCalendarCount();
    }).then((result) => {
      assert.equal(result.toNumber(), 0);
      //console.log(result.toNumber());
      //console.log(result);
    })
  })

  it("createNewCalendar() adds new Calendar contract instance to calendars array and emits an event", () => {
    let calendar_factory;
    return CalendarFactory.deployed().then(instance => {
      calendar_factory = instance;
      return calendar_factory.createNewCalendar(accounts[0]);
    }).then((result) => {
      assert.equal(result.logs[0].event, 'NewCalendarAdded');
    }).then(() => {
      return calendar_factory.getCalendarCount();
    }).then((result) => {
      //console.log((result));
      assert.equal(result.toNumber(), 1);
      //console.log(result.toNumber());
      //console.log(result);
    })
  })

  it("hasCalendar detects if someone trys to make a new calendar if they already got one", () => {
    let calendar_factory;
    return CalendarFactory.deployed().then(instance => {
      calendar_factory = instance;
      return calendar_factory.hasCalendar(accounts[0]);
    }).then((result) => {
      assert.isOk(result);
    })
  })

  it("a user cant delete someone elses calendar", () => {
    let calendar_factory;
    return CalendarFactory.deployed().then(instance => {
      calendar_factory = instance;
      return calendar_factory.deleteCalendar(accounts[0], { from: accounts[1] });
    })
    // should just revert at this point
  })

  it("a user can delete their calendar", () => {
    let calendar_factory;
    return CalendarFactory.deployed().then(instance => {
      calendar_factory = instance;
      return calendar_factory.deleteCalendar(accounts[0], { from: accounts[0] });
    }).then((result) => {
      //console.log(result);
      assert.equal(result.logs[0].event, 'CalendarDeleted');
    }).then(() => {
      return calendar_factory.getCalendarCount();
    }).then((result) => {
      //console.log((result));
      assert.equal(result.toNumber(), 0);
      //console.log(result.toNumber());
      //console.log(result);
    })
  })
  /*
  it("a user can delete their calendar", () => {
    let calendar_factory;
    return CalendarFactory.deployed().then(instance => {
      calendar_factory = instance;
      return calendar_factory.deleteCalendar(accounts[0], { from: accounts[0] });
    }).then((result) => {
      //console.log(result);
      assert.equal(result.logs[0].event, 'CalendarDeleted');
    }).then(() => {
      return calendar_factory.getCalendarCount();
    }).then((result) => {
      //console.log((result));
      assert.equal(result.toNumber(), 0);
      //console.log(result.toNumber());
      //console.log(result);
    })
  })
  */
});

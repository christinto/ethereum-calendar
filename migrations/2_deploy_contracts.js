var CalendarFactory = artifacts.require("./CalendarFactory.sol");
var Calendar = artifacts.require("./Calendar.sol");

module.exports = function(deployer) {
  deployer.deploy(CalendarFactory);
  deployer.deploy(Calendar, '0x19187922a70b9ae5a67fd39471065fd9e14c8cf4');
};

var CalendarFactory = artifacts.require("./CalendarFactory.sol");
var Calendar = artifacts.require("./Calendar.sol");

module.exports = function(deployer) {
  deployer.deploy(CalendarFactory);
  deployer.deploy(Calendar, '0x7cab07b06cc95007d79754915de897cc8d7497fe', { from:'0x7cab07b06cc95007d79754915de897cc8d7497fe' });
};

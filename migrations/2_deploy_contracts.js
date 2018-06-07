var CalendarFactory = artifacts.require("./CalendarFactory.sol");
var Calendar = artifacts.require("./Calendar.sol");

module.exports = function(deployer) {
  deployer.deploy(CalendarFactory);
  deployer.deploy(Calendar, '0xa9ab001588b7020ffddc3537a3b0adfeed9fa10e', { from:'0xa9ab001588b7020ffddc3537a3b0adfeed9fa10e' });
};

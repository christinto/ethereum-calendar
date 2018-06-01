var CalendarFactory = artifacts.require("./CalendarFactory.sol");
var Calendar = artifacts.require("./Calendar.sol");

module.exports = function(deployer) {
  deployer.deploy(CalendarFactory);
  deployer.deploy(Calendar, '0xc35d4cafb792584cc199796cb19457179db46a7a', { from:'0xc35d4cafb792584cc199796cb19457179db46a7a' });
};

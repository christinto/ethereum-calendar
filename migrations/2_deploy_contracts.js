var CalendarFactory = artifacts.require("./CalendarFactory.sol");
var Calendar = artifacts.require("./Calendar.sol");

module.exports = function(deployer) {
  deployer.deploy(CalendarFactory);
  deployer.deploy(Calendar, '0x6d11b1c9b96114d1d7005e16fb48f9da80bbe481', { from:'0x6d11b1c9b96114d1d7005e16fb48f9da80bbe481' });
};

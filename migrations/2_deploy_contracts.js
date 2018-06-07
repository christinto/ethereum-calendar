var CalendarFactory = artifacts.require("./CalendarFactory.sol");
var Calendar = artifacts.require("./Calendar.sol");

module.exports = function(deployer) {
  deployer.deploy(CalendarFactory);
  deployer.deploy(Calendar, '0xb4e0e3d287739298446bfff079a70e483dec22b8', { from:'0xb4e0e3d287739298446bfff079a70e483dec22b8' });
};

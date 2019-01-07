var SimpleListFactory = artifacts.require("./SimpleListFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleListFactory);
}

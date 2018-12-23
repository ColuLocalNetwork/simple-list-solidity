var SimpleList = artifacts.require("./SimpleList.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleList);
}
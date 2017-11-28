var ConvertLib = artifacts.require("./ConvertLib.sol");
var LoyaltyCoin = artifacts.require("./LoyaltyCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, LoyaltyCoin);
  deployer.deploy(LoyaltyCoin);
};
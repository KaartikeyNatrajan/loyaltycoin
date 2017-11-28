pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/LoyaltyCoin.sol";

contract TestLoyaltyCoin {

  function testInitialBalanceUsingDeployedContract() {
    LoyaltyCoin coin = LoyaltyCoin(DeployedAddresses.LoyaltyCoin());

    uint expected = 1000;

    Assert.equal(coin.getBalance(tx.origin), expected, "Owner should have 10000 LoyaltyCoin initially");
  }

  function testInitialBalanceWithNewLoyaltyCoin() {
    LoyaltyCoin coin = new LoyaltyCoin();

    uint expected = 1000;

    Assert.equal(coin.getBalance(tx.origin), expected, "Owner should have 10000 LoyaltyCoin initially");
  }

}

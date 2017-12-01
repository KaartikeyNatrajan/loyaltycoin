pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/User.sol";

contract TestUser {

  function testUserCreation() {
    User user = User(DeployedAddresses.User());

    bytes32 testName = "John";
    bytes32 testEmail = "test@example.com";
    bytes32 password = "password";

    bool success = user.addUser(testName, testEmail, password);
    Assert.equal(success, true, "User does not already exist");
    var (a, b, c) = user.getUserInfo();
    // Assert.equal(a, testName, "User name matches");
    // Assert.equal(b, testEmail, "User email matches");
  }

  function testAuthenticateUser() {
    User user = User(DeployedAddresses.User());
    bool success = user.authenticate("password");
    Assert.equal(success, true, "User authenticated");
  }

}

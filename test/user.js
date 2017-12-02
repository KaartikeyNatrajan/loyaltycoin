var User = artifacts.require("./User.sol");

contract('User', function(accounts) {
  it("should create a new user from existing accounts", function() {
    return User.deployed().then(function(instance) {
      return instance.addUser.call("test", "test@example.com", "password", {from: accounts[0]});
    }).then(function(success) {
      assert.equal(success, true, "user created");
    });
  });

  it("should fetch all users", function() {
    return User.deployed().then(function(instance) {
      return instance.users.call({from: accounts[0]});
    }).then(function(data) {
      console.log(data);
      // assert.equal(success, true, "user created");
    });
  });  

});

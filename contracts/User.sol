pragma solidity ^0.4.17;

/**
 * The User contract is responsible for
 * 		user account creation
 * 		reading user information
 *		authenticating users
 */
contract User {

	enum userType { customer, hotel, airline }
	
	event UserAdded(bool success);

	struct UserInfo {
		address addr;
		string name;
		string email;
		bytes32 password; // need to encrypt this
		Points[] balance;
		userType usertype;
	}

	struct Merchant {
		address addr;
		string name;
		userType usertype;
	}
	
	struct Points {
		uint air;
		uint hotel;
		uint car;
	}

	// need to add visibility specifiers here
	mapping (address => UserInfo) users;
	mapping (address => Merchant) merchants;

	
	function addUser (string name, string email, bytes32 password) public returns (bool success) {
		// user already exists at the adress.
		// User creation fails
		// if (users[msg.sender].name != "") {
		// 	return false;
		// }

		// user does not exist. Control reaches here

		// need to check for existing email in existing users

		UserInfo storage temp;
		temp.addr = msg.sender;
		temp.name = name;
		temp.email = email;
		temp.password = password;
		temp.usertype = userType.customer;

		temp.balance.push(Points({
			air : 20000,
			hotel : 10000,
			car : 5000
		}));

		temp.balance.push(Points({
			air : 10000,
			hotel : 70000,
			car : 4000
		}));		

		// add mapping in user map with 'from address' -> new user info
		users[msg.sender] = temp;
				
		UserAdded(true);
		return true;
	}

	function addHotel(string name, address addr) public {
		merchants[addr] = Merchant({
			addr : addr,
			name : name,
			usertype : userType.hotel
		});
	}

	function getUserInfo() public view returns (string name, string email, uint noOfAccounts) {
		return (users[msg.sender].name, users[msg.sender].email, users[msg.sender].balance.length);
	}

	function getUserBalances(uint row) public view returns (uint air, uint hotel, uint car) {
		Points memory temp = users[msg.sender].balance[row];
		return(temp.air, temp.hotel, temp.car);
	}

	function authenticate(bytes32 password) public view returns (bool success) {
		if (users[msg.sender].password == password) {
			return true;
		}
		
		return false;
	}
}


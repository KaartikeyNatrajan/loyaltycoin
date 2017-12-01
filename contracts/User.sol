pragma solidity ^0.4.17;

/**
 * The User contract is responsible for
 * 		user account creation
 * 		reading user information
 *		authenticating users
 */
contract User {

	enum userType { customer, hotel, airline }
	
	struct UserInfo {
		address addr;
		bytes32 name;
		bytes32 email;
		bytes32 password; // need to encrypt this
		uint balance;
		userType usertype;
	}

	struct HotelInfo {
		address addr;
		bytes32 name;
		userType usertype;
	}
	
	// need to add visibility specifiers here
	mapping (address => UserInfo) users;
	mapping (address => HotelInfo) hotels;

	function addUser (bytes32 name, bytes32 email, bytes32 password) public returns (bool success) {
		
		// user already exists at the adress.
		// User creation fails
		if (users[msg.sender].name != "") {
			return false;
		}

		// user does not exist. Control reaches here

		// need to check for existing email in existing users

		// add mapping in user map with 'from address' -> new user info
		users[msg.sender] = UserInfo ({
			addr : msg.sender,
			name : name,
			email : email,
			password : password,
			balance : 0,
			usertype : userType.customer
		});
		
		return true;
	}

	function addHotel(bytes32 name, address addr) public {
		hotels[addr] = HotelInfo({
			addr : addr,
			name : name,
			usertype : userType.hotel
		});
	}

	function getUserInfo() public view returns (bytes32 name, bytes32 email, uint balance) {
		return (users[msg.sender].name, users[msg.sender].email, users[msg.sender].balance);
	}

	function authenticate(bytes32 password) public view returns (bool success) {
		if (users[msg.sender].password == password) {
			return true;
		}
		
		return false;
	} 
}


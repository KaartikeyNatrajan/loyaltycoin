window.Auth = {
	registerUser: function() {
		var self = this;
		
		// holds contract instance
		var user;

		// holds account address
		var account;

		var name = document.getElementById('name').value;
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;

		// create an etherium account with password
		account = web3.personal.newAccount(password)

		// add account to user base
		User.deployed().then(function(instance) {
			user = instance;
			return user.addUser.call(name, email, password, {from: account});
		}).then(function(response) {
			console.log(response);
			if (response == true) {
				self.loginSuccess(account);
			} else {
				alert("error creating account");
			}
		}).catch(function(e) {
			console.log(e);
		});
	},

	loginUser: function() {
		var self = this;
		var account = document.getElementById("account").value;
		var password = document.getElementById("password").value;
		console.log(account, password);
		User.deployed().then(function(instance) {
			user = instance;
			return user.authenticate.call(password, {from: account});
		}).then(function(response) {
			console.log(response);
			if (response == true) {
				self.loginSuccess(account);
			} else {
				alert("error logging in");
			}
		}).catch(function(e) {
			console.log(e);
		});
	},

	loginSuccess: function (account) {
		sessionStorage.setItem("account", account);
		sessionStorage.setItem("loggedIn", true);
		window.location.replace(window.location.origin + "/");
	}
};

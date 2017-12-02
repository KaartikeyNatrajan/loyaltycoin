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
		account = web3.personal.newAccount(password);
		web3.personal.unlockAccount(account, password, 15000);
		
		// add account to user base
		User.deployed().then(function(instance) {
			user = instance;
			user.addUser(name, email, password, {from: account, gasPrice: 0, gas: 900000});
			self.loginSuccess(account);
		}).catch(function(e) {
			console.log(e);
		});
	},

	loginUser: function() {
		var self = this;
		var accountNumber = document.getElementById("account").value;
		var password = document.getElementById("password").value;
		console.log(accountNumber, password);
		User.deployed().then(function(instance) {
			user = instance;
			return user.authenticate.call(password, {from: accountNumber});
		}).then(function(response) {
			console.log(response);
			if (response == true) {
				self.loginSuccess(accountNumber);
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
	},

	initializeListener: function() {
		console.log("listening");
		const filter = web3.eth.filter({
			fromBlock: 0,
			toBlock: 'latest',
			address:  '0xe3e7ffb1810175cddb3670470f6c955fcb30f380ca43fd15ed823fa93047f5ce',
			topics: [web3.sha3('UserAdded(bool success)')]
		});

		filter.watch((error, result) => {
			if(!error) {
				console.log(result);
			} else {
				console.log(error);
			}
		})
	}

};

window.addEventListener('load', function(event) {
	// initialize filter to listen for user created event
	setTimeout(200, Auth.initializeListener());
});
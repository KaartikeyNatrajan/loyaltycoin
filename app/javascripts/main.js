var accounts;
var account;
var userAccount;
window.AccountManager = {
	getAccountInfo: function() {
		var self = this;
		// Get the initial account balance so it can be displayed
	},

	setStatus: function(message) {
		var status = document.getElementById("status");
		status.innerHTML = message;
	},

	refreshBalance: function() {
		var self = this;

		var coin;
		LoyaltyCoin.deployed().then(function(instance) {
			coin = instance;
			return coin.getBalance.call(account, {from: account});
		}).then(function(value) {
			var balance_element = document.getElementById("balance");
			balance_element.innerHTML = value.valueOf();
		}).catch(function(e) {
			console.log(e);
			self.setStatus("Error getting balance; see log.");
		});
	},

	showAllBalances: function() {
		var coin;
		console.log(accounts);
		var balancesHolder = document.getElementById('balances');
		LoyaltyCoin.deployed().then(function(instance) {
			coin = instance;
			for (var i = accounts.length - 1; i >= 0; i--) {
				var bal = coin.getBalance.call(accounts[i], {from: account});
				bal.then(function(value) {
					balancesHolder.innerHTML +=  value.valueOf() + "</br>";	
				});
			}
		}).catch(function(e) {
			console.log(e);
		});
	},

	sendCoin: function() {
		var self = this;

		var amount = parseInt(document.getElementById("amount").value);
		var receiver = document.getElementById("receiver").value;

		this.setStatus("Initiating transaction... (please wait)");

		var coin;
		LoyaltyCoin.deployed().then(function(instance) {
			coin = instance;
			return coin.sendCoin(receiver, amount, {from: account});
		}).then(function() {
			self.setStatus("Transaction complete!");
			self.refreshBalance();
		}).catch(function(e) {
			console.log(e);
			self.setStatus("Error sending coin; see log.");
		});
	},

	availService: function() {
		var self = this;
		var coin;
		LoyaltyCoin.deployed().then(function(instance) {
			coin = instance;
			return coin.userAvailedService(accounts[1], 500, {from: accounts[0]});
		}).then(function() {
			self.setStatus("Transaction complete!");
			self.refreshBalance();
			self.showAllBalances();
		}).catch(function(e) {
			console.log(e);
			self.setStatus("Error receiving coin; see log.");
		});
	}
}

window.addEventListener('load', function() {
	// some delay so that the app can get intialized first before 
	// this method is called
	userAccount = sessionStorage.getItem("account");
	setTimeout(200, AccountManager.getAccounts());
});
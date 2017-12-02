var accounts;
var account;
var userAccount;
window.AccountManager = {
	getUserDetails: function() {
		this.getPersonalInfo();
	},

	setStatus: function(message) {
		var status = document.getElementById("status");
		status.innerHTML = message;
	},

	getPersonalInfo: function() {
		var self = this;
		
		var userName = document.getElementById("username");
		var accountId = document.getElementById("accountid");
		accountId.innerHTML = userAccount;

		User.deployed().then(function(instance) {
			return instance.getUserInfo.call({from: userAccount});
		}).then(function(value) {
			console.log(value);
			userName.innerHTML = value[0];
			self.getBalances(value[2].valueOf());
		}).catch(function(e) {
			console.log(e);
			self.setStatus("Error getting balance; see log.");
		});
	},

	getBalances: function(noOfAccounts) {
		var self = this;
		var balanceTable = document.getElementById("balance-table");
		User.deployed().then(function(instance) {
			for (var i = noOfAccounts - 1; i >= 0; i--) {
				var bal = instance.getUserBalances.call(i, {from: userAccount});
				bal.then(function(value) {
					console.log(value);
					var tableRow = document.createElement("tr");
					for(var j = 0; j < 3; j++) {
						var tableColumn = document.createElement("td");
						tableColumn.innerHTML = value[j].valueOf();
						tableRow.appendChild(tableColumn);
					}
					balanceTable.appendChild(tableRow);	
				});
			}
		}).catch(function(e) {
			console.log(e);
			self.setStatus("Error getting balance; see log.");
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
	}
}

window.addEventListener('load', function() {
	// some delay so that the app can get intialized first before 
	// this method is called
	userAccount = sessionStorage.getItem("account");
	setTimeout(200, AccountManager.getUserDetails());
});
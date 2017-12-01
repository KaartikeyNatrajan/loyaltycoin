// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'; // eslint-disable-line no-unused-vars

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import loyaltycoin_artifacts from '../../build/contracts/LoyaltyCoin.json'
import user_artifacts from '../../build/contracts/User.json'

// LoyaltyCoin and User are our usable abstractions, which we'll use through the code below.
window.LoyaltyCoin = contract(loyaltycoin_artifacts);
window.User = contract(user_artifacts);

window.App = {
	start: function() {
		// Bootstrap the LoyaltyCoin abstraction for Use.
		LoyaltyCoin.setProvider(web3.currentProvider);

		// Bootstrap the User abstraction for Use.
		User.setProvider(web3.currentProvider);
	
		this.checkLogin();
	},

	checkLogin: function() {
		if(window.location.href.search("auth") >= 0) {
			return;
		}
		// if logged in is not set to true in session storage, redirect to login page
		if(!sessionStorage.getItem("loggedIn")) {
			window.location.replace(window.location.origin + "/auth/login.html");
		}
	}

};

window.addEventListener('load', function() {
	// Checking if Web3 has been injected by the browser (Mist/MetaMask)
	if (typeof web3 !== 'undefined') {
		console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 LoyaltyCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
		// Use Mist/MetaMask's provider
		window.web3 = new Web3(web3.currentProvider);
	} else {
		console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
		// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
		window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
	}

	App.start();
});

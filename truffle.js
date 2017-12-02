// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      gasPrice: 0,
      gas: 9999999999,
      network_id: '*' // Match any network id
    }
  }
}

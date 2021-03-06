const HDWalletProvider = require('truffle-hdwallet-provider')

let mnemonic = ''

if (process.env.MNEMONIC) {
  mnemonic = process.env.MNEMONIC
}

module.exports = {
  networks: {
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, 'https://mainnet.infura.io'),
      network_id: '1',
      gas: 4500000,
      gasPrice: 10000000000,
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, 'https://ropsten.infura.io'),
      network_id: '*',
      gas: 5721975,
      gasPrice: 25000000000,
    },
    fuse: {
      provider: () => new HDWalletProvider(mnemonic, 'http://rpc.fuse.io'),
      network_id: '*',
      gas: 6721975,
      gasPrice: 1000000000,
    },
    // config for solidity-coverage
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 7545, // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01, // <-- Use this low gas price
    }
  },
  compilers: {
      solc: {
          version: "^0.4.24",  // ex:  "0.4.20". (Default: Truffle's installed solc)
      }
  }
}

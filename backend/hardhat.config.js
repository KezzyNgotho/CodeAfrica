const { HardhatUserConfig } = require('hardhat/config');
require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

// Hardhat configuration
const config = {
  solidity: {
    version: '0.8.23',
  },
  networks: {

    sepolia: {
      url: "https://sepolia.infura.io/v3/d0715abf1c98448697d99e36f2ed2800",
      accounts: ["d99d7bae0018c2608e32f6e1eebd8f8702874d762b462cb6b2d71d16123833f2"],
    },
    // Mainnet configuration
    'base-mainnet': {
      url: 'https://mainnet.base.org',
      accounts: [process.env.WALLET_KEY],
      gasPrice: 1000000000,
    },
    // Testnet configuration
    'base-sepolia': {
      url: 'https://sepolia.base.org',
      accounts: [process.env.WALLET_KEY],
      gasPrice: 1000000000,
    },
    // Local development configuration
    'base-local': {
      url: 'http://localhost:8545',
      accounts: [process.env.WALLET_KEY],
      gasPrice: 1000000000,
    },
  },
  defaultNetwork: 'hardhat',
};

module.exports = config;

// web3Config.js
import Web3 from 'web3';

const web3 = new Web3();

// Set the provider to connect to the Alfajores testnet
web3.setProvider(
  new Web3.providers.HttpProvider("https://alfajores-forno.celo-testnet.org")
);

export default web3;

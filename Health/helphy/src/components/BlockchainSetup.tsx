// BlockchainSetup.js

import Web3 from 'web3';
import {
  IdentityVerificationABI,
  IdentityVerificationAddress,
} from './contracts/IdentityVerification.json';

import {
  AssetTokenizationABI,
  AssetTokenizationAddress,
} from './contracts/AssetTokenization.json';

const web3 = new Web3(/* Provide a provider or URL */);

const identityVerificationContract = new web3.eth.Contract(IdentityVerificationABI, IdentityVerificationAddress);
const assetTokenizationContract = new web3.eth.Contract(AssetTokenizationABI, AssetTokenizationAddress);

// Export the initialized contract instances
export {
  identityVerificationContract,
  assetTokenizationContract,
};

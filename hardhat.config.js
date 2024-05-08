require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: ['bd47c7efce15513f1e5536d35b1d1259c37468c9f4db7c73632a7f960b602ca6']
    }
  }
};

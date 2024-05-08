require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    alfajores: {
      url: `https://alfajores-forno.celo-testnet.org`,
      accounts:['d99d7bae0018c2608e32f6e1eebd8f8702874d762b462cb6b2d71d16123833f2'] ,
    },
  },
  solidity: "0.8.0",
};

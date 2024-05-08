require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

const PRIVATE_KEY =
  "d99d7bae0018c2608e32f6e1eebd8f8702874d762b462cb6b2d71d16123833f2";
const INFURA_PROJECT_ID = "zdn6J42C044A14gLnao93zbvje3_tk-c";

module.exports = {
  networks: {
    "base-sepolia": {
      url: `https://base-sepolia.g.alchemy.com/v2/${INFURA_PROJECT_ID}`,
      accounts: [PRIVATE_KEY],
    },
  },
  solidity: "0.8.0",
};

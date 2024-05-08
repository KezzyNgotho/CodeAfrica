const { ethers } = require('hardhat');

async function main() {
  const alchemyUrl = "https://eth-mainnet.g.alchemy.com/v2/MvTcaxDkANAIVREiP5BQQB9IuLRM_E3D"; // Alchemy endpoint URL
  const alchemyApiKey = "MvTcaxDkANAIVREiP5BQQB9IuLRM_E3D"; // Alchemy API key

  // Create a provider using Alchemy's endpoint URL and API key
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl, {
    headers: {
      'Authorization': `Bearer ${alchemyApiKey}`
    }
  });

  // Load the compiled contract artifacts
  const ContractArtifact = await ethers.getContractFactory("UserRegistry");

  // Replace "YOUR_PRIVATE_KEY" with the private key of the deploying account
  const privateKey = "YOUR_PRIVATE_KEY";

  // Create a wallet instance from the private key
  const wallet = new ethers.Wallet(privateKey, provider);

  // Connect the wallet to a factory to deploy the contract
  const contractFactory = new ethers.ContractFactory(
    ContractArtifact.interface,
    ContractArtifact.bytecode,
    wallet
  );

  // Deploy the contract
  const userRegistry = await contractFactory.deploy();

  // Wait for the contract to be deployed
  await userRegistry.deployed();
  console.log("UserRegistry deployed to:", userRegistry.address);

  // Example interaction with the contract
  // You can call contract functions, read contract state, etc. here
  const contractOwner = await userRegistry.owner();
  console.log("Contract owner:", contractOwner);

  // Example: call a function on the contract
  const tx = await userRegistry.someFunction(param1, param2);
  await tx.wait();
  console.log("Transaction hash:", tx.hash);

  // Example: read contract state
  const contractState = await userRegistry.someStateVariable();
  console.log("Contract state:", contractState);
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});

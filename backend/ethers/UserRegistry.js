const { ethers } = require("ethers");


const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace this with the address of your deployed contract

// Initialize ethers provider
const provider = new ethers.providers.JsonRpcProvider('https://base-sepolia.g.alchemy.com/v2/zdn6J42C044A14gLnao93zbvje3_tk-c');

// Connect to your contract
const contract = new ethers.Contract(contractAddress, provider);

// Example function to register a user
async function registerUser(username, password, role, data) {
  try {
    // Call the register function on your contract
    const tx = await contract.register(username, password, role, data);
    await tx.wait(); // Wait for the transaction to be mined
    console.log("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

// Example function to check if a user exists
async function userExists(address) {
  try {
    // Call the users mapping to check if a user exists
    const user = await contract.users(address);
    return user.username.length > 0;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return false;
  }
}

// Export functions for use in your frontend
module.exports = {
  registerUser,
  userExists,
};

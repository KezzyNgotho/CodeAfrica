# Helphy

Helphy is a decentralized application built on the Ethereum and Celo blockchains, aimed at solving the problem of bridging the gap between medical suppliers and patients in the global healthcare ecosystem. The primary use case instance is the Kenya Pharmacy and Poisons Board. Helphy facilitates the registration and interaction of various stakeholders, including patients, hospitals, pharmacies, and suppliers, providing transparency, traceability, and secure data management throughout the pharmaceutical supply chain.

## Features

- **User Registration**: Users can register themselves based on their respective roles (patient, hospital, pharmacy, or supplier) by providing the necessary information and verifying their identity through MetaMask or WalletConnect.
- **Role-based Access Control**: The application enforces role-based access control, ensuring that users can only perform actions and access information relevant to their roles.
- **Medical History Tracking**: Patients can securely store and share their medical history with authorized healthcare providers.
- **Pharmaceutical Supply Chain Management**: The application enables tracking of pharmaceutical products from suppliers to hospitals and pharmacies, ensuring transparency and accountability throughout the supply chain.
- **Decentralized Data Storage**: All data is stored on the Ethereum and Celo blockchains, providing tamper-proof and immutable records.

## Technologies Used

- **Solidity**: The smart contracts that power the Helphy application are written in Solidity, a contract-oriented programming language for the Ethereum Virtual Machine (EVM).
- **TypeScript**: The frontend of the application is built using TypeScript, a statically typed superset of JavaScript, and React, a popular JavaScript library for building user interfaces.
- **Wagmi**: Helphy utilizes the Wagmi library, a collection of React hooks for interacting with Ethereum-compatible blockchains and smart contracts.
- **Hardhat**: Hardhat is the development environment used for compiling, testing, and deploying the Solidity smart contracts.
- **MetaMask**: MetaMask is a browser extension that acts as an Ethereum wallet, allowing users to securely manage their Ethereum accounts and interact with decentralized applications (dApps) like Helphy.
- **WalletConnect**: WalletConnect is an open-source protocol for connecting decentralized applications to mobile wallets, providing an alternative to MetaMask for user authentication and interaction.

## Getting Started

To run the Helphy application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/helphy.git
2. Install dependencies for the frontend and backend:
   - Frontend:
     ```bash
     cd Health/helphy
     yarn install or npm install
   - Backend (Solidity contracts):
     ```base
     cd Health
     yarn install or npm install
3. Compile and deploy the smart contracts to the local development environment using Hardhat.
4. Configure the frontend with the deployed contract addresses and start the development server:
   ```bash
   cd Health/helphy
   yarn dev or npm dev
5. Open the application in your browser at:
   ```bash
   http://localhost:5174

## Contributing

We welcome contributions to Helphy! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b my-feature-branch`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-feature-branch`
5. Submit a pull request.

## Credits

Helphy was built by Sponge-buddies (Keziah Ngotho & Henry Kimani).

## Contact

If you have any questions or suggestions, feel free to reach out to us at [keziengotho18@gmail.com](mailto:keziengotho18@gmail.com).

# Car Chain Rental Project

## Overview

This project is a decentralized car rental service built using Solidity for the smart contracts and React for the frontend. It allows users to rent cars directly from owners using cryptocurrency, leveraging the Ethereum blockchain on the Sepolia test network.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed **Node.js** and **npm**.
- You have installed the **MetaMask** browser extension.
- You have configured MetaMask to connect to the **Sepolia network**. This is necessary to interact with the deployed smart contracts.

## Running the Project

Follow these steps to get your frontend running:

1. **Open your terminal.**

2. **Change to the frontend directory of the project:**

   ```bash
   cd frontend
   ```

3. **Install the project dependencies:**

   ```bash
   npm install
   ```

4. **Start the application:**

   ```bash
   npm start
   ```

## Additional Information

Please note that the smart contract for this project is already deployed on the Sepolia network. You do not need to deploy the smart contract yourself; you only need to connect your MetaMask wallet to interact with the existing contract and the application.

### Contract Code

- The smart contract code is located in the `contract` folder within the project directory.

### Optional: Deploying the Contract Yourself

If you wish to deploy the smart contract on your own:

1. Create a `.env` file based on the `.env.example` provided, filling in your own API URL and private key. This is necessary for connecting to the Ethereum network.
2. Use Hardhat to compile and deploy the contract.

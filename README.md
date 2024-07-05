# Car Chain Rental Project

## Overview

This project is a decentralized car rental service built using Solidity for the smart contracts and React for the frontend. It allows users to rent cars directly from owners using cryptocurrency, leveraging the Ethereum blockchain on the Sepolia test network.

<img width="1339" alt="image" src="https://github.com/SalahDevp/p2p-car-rental-platform/assets/89255483/1d57282a-84bb-4f9f-98a5-c449f0a010ca">

- **Renter**:
<img width="1335" alt="image" src="https://github.com/SalahDevp/p2p-car-rental-platform/assets/89255483/214e26d4-0d4b-42e2-8a89-196c9a0bb4f2">

<img width="1323" alt="image" src="https://github.com/SalahDevp/p2p-car-rental-platform/assets/89255483/35fb8e2b-169d-4d42-bac7-5c4b5c9682ba">

- **Owner**:

<img width="1334" alt="image" src="https://github.com/SalahDevp/p2p-car-rental-platform/assets/89255483/4bd7b119-874f-4ad4-8272-185b8f0aef14">

<img width="1333" alt="image" src="https://github.com/SalahDevp/p2p-car-rental-platform/assets/89255483/4ac51c9d-700d-4af2-8996-04529bd83c4a">



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

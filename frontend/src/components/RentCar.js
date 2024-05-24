import './RentCar.scss';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';

export default function RentCar({ contract }) {
  const [ethDepositAmount, setEthDepositAmount] = useState('');
  const [balance, setBalance] = useState('0.0');
  const [due, setDue] = useState('0');
  const [name, setName] = useState('mate');
  const [totalDuration, setTotalDuration] = useState('0');
  const [isActive, setIsActive] = useState('false');

  const currentAddress = useSelector((state) => state.currentAddress.address);

  useEffect(() => {
    getBalanceOfRenter().catch(console.error);
    getParamsOfRenter().catch(console.error);
    if (!isActive) {
      getTotalDuration().catch(console.error);
    }
  });

  const getBalanceOfRenter = async () => {
    const balance = await contract.balanceOfRenter(currentAddress);
    const balanceFormated = ethers.utils.formatEther(balance);
    setBalance(balanceFormated);
  };
  const getParamsOfRenter = async () => {
    const currentRenter = await contract.renters(currentAddress);
    const due = currentRenter[6];
    const dueFormated = ethers.utils.formatEther(due);
    setDue(dueFormated);
    const name = currentRenter[1];
    setName(name);
    const active = currentRenter[4];
    setIsActive(active);
  };
  const getTotalDuration = async () => {
    const totalDuration = await contract.getTotalDuration(currentAddress);
    const stringedTotalDuration = totalDuration.toString();
    if (totalDuration) {
      setTotalDuration(stringedTotalDuration);
      console.log('duration is: ' + stringedTotalDuration);
    }
  };

  const handleDepositEth = () => {
    // e.preventDefault();
    const ethValue = ethers.utils.parseEther(ethDepositAmount);
    const options = { value: ethValue };
    const deposit = async () => {
      const depositValue = await contract.deposit(currentAddress, options);
      await depositValue.wait();
      const balance = await contract.balanceOfRenter(currentAddress);
      const balanceFormated = ethers.utils.formatEther(balance);
      setBalance(balanceFormated);
    };
    deposit();
    setEthDepositAmount('');
  };
  const handleRepay = async () => {
    const repayAmountProvided = ethers.utils.parseEther(due);
    console.log('due after parse is: ' + repayAmountProvided);
    const options = { value: repayAmountProvided };
    const repay = await contract.makePayment(currentAddress);
    await repay.wait();
    getTotalDuration().catch(console.error);
  };

  return (
    <div className='container rent-car-page'>
      <div className='welcome-text'>
        <h1> Hey {name ? name : 'mate'}! Here are your pulpit:</h1>
      </div>
      <div className='pulpit-stats'>
        <div className='pulpit-box'>
          <p>Balance</p>
          <pre>{balance}</pre>
          <AccountBalanceWalletIcon className='pulpit-icon' />
        </div>
        <div className='pulpit-box'>
          <p>Eth Due</p>
          <pre>{due}</pre>
          <AttachMoneyIcon className='pulpit-icon' />
        </div>
        <div className={!isActive ? 'pulpit-box' : 'pulpit-box active'}>
          <p>Rent time</p>
          <pre>{totalDuration} min</pre>
          <AccessTimeIcon className='pulpit-icon' />
        </div>
      </div>
      <div className='pulpit-payments'>
        <div className='deposit-eth-box'>
          <form>
            <h2>Credit Your Account</h2>
            <input
              className='payment-input'
              type='number'
              placeholder='eth amount'
              required
              onChange={(e) => {
                setEthDepositAmount(e.target.value);
              }}
              value={ethDepositAmount}
            ></input>
            <button
              className='button-class form-deposit-button'
              type='button'
              onClick={() => {
                handleDepositEth();
              }}
            >
              Deposit
            </button>
          </form>
        </div>
        <div className='deposit-eth-box'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h2>Repay Your Due</h2>
            <input
              className='payment-input'
              type='number'
              placeholder='eth amount'
              required
              disabled
              value={due}
            ></input>
            <button
              className='button-class form-deposit-button'
              type='submit'
              onClick={() => handleRepay()}
            >
              Repay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import "./Info.scss";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useSelector } from "react-redux";

export default function RenterInfo({ contract }) {
  const [ethDepositAmount, setEthDepositAmount] = useState("");
  const [balance, setBalance] = useState("0.0");
  const [reserved, setReserved] = useState("0.0");
  const [name, setName] = useState("");
  const [isRenting, setIsRenting] = useState(false);
  const [rentStart, setRentStart] = useState("");
  const [totalDuration, setTotalDuration] = useState(0);

  const currentAddress = useSelector((state) => state.currentAddress.address);

  const getParamsOfRenter = async () => {
    const currentRenter = await contract.renters(currentAddress);
    console.log("currentRenter", currentRenter);
    const firstName = currentRenter[1];
    const lastName = currentRenter[2];
    const name = firstName + " " + lastName;
    setName(name);
    const isRenting = !currentRenter[3];
    setIsRenting(isRenting);
    const balance = ethers.utils.formatEther(currentRenter[5]);
    setBalance(balance);
    const reserved = ethers.utils.formatEther(currentRenter[6]);
    setReserved(reserved);
    const rentStart = new Date(currentRenter[7] * 1000);
    console.log("rentStart", rentStart);
    setRentStart(rentStart);
  };

  const handleDepositEth = () => {
    // e.preventDefault();
    const ethValue = ethers.utils.parseEther(ethDepositAmount);
    const options = { value: ethValue };
    const deposit = async () => {
      const tx = await contract.deposit(currentAddress, options);
      await tx.wait();
      const balance = await contract.balanceOfRenter(currentAddress);
      const balanceFormated = ethers.utils.formatEther(balance);
      setBalance(balanceFormated);
    };
    deposit();
    setEthDepositAmount("");
  };

  useEffect(() => {
    getParamsOfRenter().catch(console.error);
  }, []);

  const calculateDuration = (start) => {
    const now = new Date();
    const duration = Math.floor((now - start) / 60000);
    setTotalDuration(duration);
  };
  //update rent time every minute
  useEffect(() => {
    if (!isRenting) return;
    calculateDuration(rentStart);
    const intervalId = setInterval(() => {
      if (rentStart) {
        calculateDuration(rentStart);
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, [isRenting, rentStart]);

  return (
    <div className="container rent-car-page">
      <div className="welcome-text">
        <h1> Hey {name ? name : ""}! Welcome back:</h1>
      </div>
      <div className="pulpit-stats">
        <div className="pulpit-box">
          <p>Balance (Reserved)</p>
          <pre>
            {balance} ({reserved})
          </pre>
          <AccountBalanceWalletIcon className="pulpit-icon" />
        </div>
        <div className="pulpit-box">
          <p>Eth Due</p>
          <pre>{" . "}</pre>
          <AttachMoneyIcon className="pulpit-icon" />
        </div>
        <div className={!isRenting ? "pulpit-box" : "pulpit-box active"}>
          <p>Rent time</p>
          <pre>{totalDuration} min</pre>
          <AccessTimeIcon className="pulpit-icon" />
        </div>
      </div>
      <div className="pulpit-payments">
        <div className="deposit-eth-box">
          <form>
            <h2>Credit Your Account</h2>
            <input
              className="payment-input"
              type="number"
              placeholder="eth amount"
              required
              onChange={(e) => {
                setEthDepositAmount(e.target.value);
              }}
              value={ethDepositAmount}
            ></input>
            <button
              className="button-class form-deposit-button"
              type="button"
              onClick={() => {
                handleDepositEth();
              }}
            >
              Deposit
            </button>
          </form>
        </div>
        {/* <div className="deposit-eth-box">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h2>Repay Your Due</h2>
            <input
              className="payment-input"
              type="number"
              placeholder="eth amount"
              required
              disabled
              value={due}
            ></input>
            <button
              className="button-class form-deposit-button"
              type="submit"
              onClick={() => handleRepay()}
            >
              Repay
            </button>
          </form>
        </div> */}
      </div>
    </div>
  );
}

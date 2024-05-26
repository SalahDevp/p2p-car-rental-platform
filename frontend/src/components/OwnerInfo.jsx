import "./Info.scss";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useSelector } from "react-redux";

export default function OwnerInfo({ contract }) {
  const [balance, setBalance] = useState("0.0");
  const [name, setName] = useState("");
  const [withdraw, setWithdraw] = useState("");

  const currentAddress = useSelector((state) => state.currentAddress.address);

  const getParamsOfOwner = async () => {
    const currentOwner = await contract.owners(currentAddress);
    console.log("currentOwner", currentOwner);
    const firstName = currentOwner[1];
    const lastName = currentOwner[2];
    const name = firstName + " " + lastName;
    setName(name);
    const balance = ethers.utils.formatEther(currentOwner[3]);
    setBalance(balance);
  };

  const handleWithdraw = async () => {
    const amount = ethers.utils.parseEther(withdraw);
    try {
      const tx = await contract.ownerWithdraw(amount);
      await tx.wait();
      const balance = await contract.getOwnerBalance(currentAddress);
      const balanceFormated = ethers.utils.formatEther(balance);
      setBalance(balanceFormated);
      setWithdraw("");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getParamsOfOwner().catch(console.error);
  }, []);

  return (
    <div className="container rent-car-page">
      <div className="welcome-text">
        <h1> Hey {name ? name : ""}! Welcome back:</h1>
      </div>
      <div className="pulpit-stats">
        <div className="pulpit-box">
          <p>Balance </p>
          <pre>{balance}</pre>
          <AccountBalanceWalletIcon className="pulpit-icon" />
        </div>
      </div>
      <div className="pulpit-payments">
        <div className="deposit-eth-box">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h2>Withdraw</h2>
            <input
              className="payment-input"
              type="number"
              placeholder="eth amount"
              required
              value={withdraw}
              onChange={(e) => setWithdraw(e.target.value)}
            ></input>
            <button
              className="button-class form-deposit-button"
              onClick={() => handleWithdraw()}
            >
              withdraw
            </button>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
}

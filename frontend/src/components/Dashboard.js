import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect, disconnect } from "../features/connect/checkConnectionSlice";
import { updateAddress } from "../features/currentAddress/currentAddresSlice";
import "./Dashboard.scss";
import DashboardLogin from "./DashboardLogin";
import DashboardFleet from "./DashboardFleet";
import DashboardForm from "./DashboardForm";
import RentCar from "./RentCar";
import { ethers } from "ethers";
import contractAbi from "../assets/CarChain.json";
import AddCarForm from "./AddCarForm";
require("dotenv").config();

export default function Dashboard() {
  const [address, setAddress] = useState("");
  const [chainId, setChainId] = useState("");
  const connected = useSelector((state) => state.connector.connected);
  const registered = useSelector((state) => state.registrator.registered);
  const currentAddress = useSelector((state) => state.currentAddress.address);
  const role = useSelector((state) => state.registrator.role);
  const dispatch = useDispatch();
  const contractAddress = "0xB902CdeDA9fcAA57268EEaE3fE7854ffB08116C6";
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = provider.getSigner();

  const connectWallet = async () => {
    if (!window.ethereum) {
      console.log("please install MetaMask");
      return;
    }
    let accounts = await provider.send("eth_requestAccounts", []);
    const address = await signer.getAddress();
    const chainId = await signer.getChainId();
    if (address.length > 0) {
      setAddress(address);
    }
    setChainId(chainId);
  };

  useEffect(() => {
    connectWallet().catch(console.error);
  }, []);

  useEffect(() => {
    if (address) {
      dispatch(connect());
      dispatch(updateAddress(address));
    }
  }, [address]);

  const contract = useMemo(
    () => new ethers.Contract(contractAddress, contractAbi.abi, signer),
    []
  );

  return (
    <div className="container dashboard-page">
      <div className="dashboard-top">
        {!connected || !registered ? (
          <div className="dashboard-form-row">
            <DashboardLogin />
            <DashboardForm contract={contract} provider={provider} />
          </div>
        ) : (
          <>
            <RentCar contract={contract} />
            {role === "owner" ? (
              <div className="dashboard-form-row">
                <AddCarForm contract={contract} />
              </div>
            ) : (
              <div className="dashboard-form-row"></div>
            )}
          </>
        )}
      </div>
      <div className="dashboard-fleet-row">
        <DashboardFleet contract={contract} />
      </div>
    </div>
  );
}

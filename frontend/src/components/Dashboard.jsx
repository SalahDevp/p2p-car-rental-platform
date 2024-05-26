import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect, disconnect } from "../features/connect/checkConnectionSlice";
import { updateAddress } from "../features/currentAddress/currentAddresSlice";
import "./Dashboard.scss";
import DashboardLogin from "./DashboardLogin";
import DashboardFleet from "./DashboardFleet";
import DashboardForm from "./DashboardForm";
import RenterInfo from "./RenterInfo";
import { ethers } from "ethers";
import contractAbi from "../assets/CarChain.json";
import AddCarForm from "./AddCarForm";
import OwnerInfo from "./OwnerInfo";
import { CONTRACT_ADDRESS } from "../config";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [address, setAddress] = useState("");
  const [chainId, setChainId] = useState("");
  const [contract, setContract] = useState(null);
  const connected = useSelector((state) => state.connector.connected);
  const registered = useSelector((state) => state.registrator.registered);
  const currentAddress = useSelector((state) => state.currentAddress.address);
  const role = useSelector((state) => state.registrator.role);
  const dispatch = useDispatch();
  const contractAddress = CONTRACT_ADDRESS;

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask");
      console.log("please install MetaMask");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    let accounts = await provider.send("eth_requestAccounts", []);
    const address = await signer.getAddress();
    const chainId = await signer.getChainId();
    if (address.length > 0) {
      setAddress(address);
    }
    setChainId(chainId);
    setContract(new ethers.Contract(contractAddress, contractAbi.abi, signer));
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

  if (contract)
    return (
      <div className="container dashboard-page">
        <div className="dashboard-top">
          {!connected || !registered ? (
            <div className="dashboard-form-row">
              <DashboardLogin />
              <DashboardForm contract={contract} />
            </div>
          ) : (
            <>
              {role === "owner" ? (
                <div className="dashboard-form-row">
                  <OwnerInfo contract={contract} />
                  <AddCarForm contract={contract} />
                </div>
              ) : (
                <div className="dashboard-form-row">
                  <RenterInfo contract={contract} />
                </div>
              )}
            </>
          )}
        </div>
        <div className="dashboard-fleet-row">
          <DashboardFleet contract={contract} />
        </div>
      </div>
    );
  else return <div>Loading...</div>;
}

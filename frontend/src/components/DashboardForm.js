import "./DashboardForm.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/register/checkRegistrationSlice";

export default function DashboardForm({ contract, provider }) {
  const currentAddress = useSelector((state) => state.currentAddress.address);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("renter");

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!name || !lastName) return;
    if (role === "renter") {
      const addRenter = await contract.addRenter(
        currentAddress,
        name,
        lastName
      );
      await addRenter.wait();
    } else {
      const addOwner = await contract.addOwner(currentAddress, name, lastName);
      await addOwner.wait();
    }
    window.location.reload();
  };

  const checkRegistered = async () => {
    const renter = await contract.renters(currentAddress);
    const renterWallet = renter[0];
    const owner = await contract.owners(currentAddress);
    const ownerWallet = owner[0];
    if (renterWallet === currentAddress || ownerWallet === currentAddress) {
      dispatch(
        register({ role: renterWallet === currentAddress ? "renter" : "owner" })
      );
    }
  };

  useEffect(() => {
    checkRegistered();
  }, [currentAddress]);

  return (
    <div className="container dashboard-form">
      <div className="form-container">
        <form onSubmit={handleRegisterSubmit}>
          <input
            className="name"
            type="text"
            placeholder="First Name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          ></input>
          <input
            className="lastName"
            type="text"
            placeholder="Last Name"
            required
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          ></input>
          <select
            className="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="renter">Renter</option>
            <option value="owner">Owner</option>
          </select>
          <button className="button-class form-submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

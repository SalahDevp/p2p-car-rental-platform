import "./DashboardForm.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/register/checkRegistrationSlice";

export default function DashboardForm({ contract, provider }) {
  const currentAddress = useSelector((state) => state.currentAddress.address);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!name || !lastName) return;
    const addRenter = await contract.addRenter(currentAddress, name, lastName);
    await addRenter.wait();
    window.location.reload();
  };

  const canRent = async () => {
    const canRentCar = await contract.canRentCar(currentAddress);
    const currentRenter = await contract.renters(currentAddress);
    const name = currentRenter[1];
    if (canRentCar || name.length > 0) {
      dispatch(register());
    }
  };
  canRent();

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
          <button className="button-class form-submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

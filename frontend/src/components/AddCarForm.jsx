import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import "./AddCarForm.scss";
import { toast } from "react-toastify";
/*
function addCar(
        string memory make,
        string memory model,
        string memory year,
        string memory color,
        string memory licensePlate,
        uint256 price,
        uint256 minDeposit,
    ) */

function AddCarForm({ contract }) {
  const [car, setCar] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    licensePlate: "",
    price: "",
    minDeposit: "",
  });

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      const addCar = await contract.addCar(
        car.make,
        car.model,
        car.year,
        car.color,
        car.licensePlate,
        ethers.utils.parseEther(car.price),
        ethers.utils.parseEther(car.minDeposit)
      );
      await addCar.wait();
      window.location.reload();
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  };
  return (
    <div className="container dashboard-form">
      <div className="form-container add-car-form">
        <form onSubmit={(e) => handleAddCar(e)}>
          <h2>Add Car:</h2>
          <input
            type="text"
            placeholder="make"
            required
            onChange={(e) => setCar({ ...car, make: e.target.value })}
            value={car.make}
          ></input>
          <input
            type="text"
            placeholder="model"
            required
            onChange={(e) => setCar({ ...car, model: e.target.value })}
            value={car.model}
          ></input>
          <input
            type="text"
            placeholder="year"
            required
            onChange={(e) => setCar({ ...car, year: e.target.value })}
            value={car.year}
          ></input>
          <input
            type="text"
            placeholder="color"
            required
            onChange={(e) => setCar({ ...car, color: e.target.value })}
            value={car.color}
          ></input>
          <input
            type="text"
            placeholder="licensePlate"
            required
            onChange={(e) => setCar({ ...car, licensePlate: e.target.value })}
            value={car.licensePlate}
          ></input>
          <input
            type="number"
            placeholder="price"
            required
            onChange={(e) => setCar({ ...car, price: e.target.value })}
            value={car.price}
          ></input>
          <input
            type="number"
            placeholder="minDeposit"
            required
            onChange={(e) => setCar({ ...car, minDeposit: e.target.value })}
            value={car.minDeposit}
          ></input>

          <button className="button-class form-submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCarForm;

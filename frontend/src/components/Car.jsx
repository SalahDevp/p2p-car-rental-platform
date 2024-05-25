import React, { useEffect, useState } from "react";
import "./DashboardFleet.scss";
import vwPolo from "../assets/vwPolo.png";
import tucson from "../assets/tucson.png";
import corolla from "../assets/corolla.png";
import gear from "../assets/gear.png";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import LuggageIcon from "@mui/icons-material/Luggage";
import { TbBrandAsana } from "react-icons/tb";
import { FaCarAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { TbLicense } from "react-icons/tb";
import { FaEthereum } from "react-icons/fa";
import { ethers } from "ethers";
import { useSelector } from "react-redux";

function Car({ contract, carId }) {
  const [car, setCar] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    licensePlate: "",
    price: "",
    minDeposit: "",
  });
  const getCar = async () => {
    const car = await contract.cars(carId);
    setCar({
      ...car,
      price: ethers.utils.formatEther(car.price),
      minDeposit: ethers.utils.formatEther(car.minDeposit),
    });
  };
  useEffect(() => {
    getCar();
  }, [contract, carId]);

  const pickUpHandler = () => {};
  const dropOffHandler = () => {};

  return (
    <div className="car-container car1">
      <img className="car-img" src={vwPolo} alt="vw Polo" />
      <div className="car-description">
        <ul>
          <li>
            <TbBrandAsana /> {car.make}
          </li>
          <li>
            <FaCarAlt /> {car.model}
          </li>
          <li>
            <MdDateRange /> {car.year}
          </li>
          <li>
            <IoIosColorPalette /> {car.color}
          </li>
          <li>
            <TbLicense /> {car.licensePlate}
          </li>
          <li>
            <FaEthereum /> {car.price}
          </li>
          <li>Minimum deposit: {car.minDeposit}</li>
        </ul>
      </div>
      <div className="button-box">
        <button
          className="button-class rent-car-button"
          type="submit"
          onClick={() => pickUpHandler()}
        >
          Pick Up
        </button>
        <button
          className="button-class rent-car-button"
          type="submit"
          onClick={() => dropOffHandler()}
        >
          Drop off
        </button>
      </div>
    </div>
  );
}

export default Car;

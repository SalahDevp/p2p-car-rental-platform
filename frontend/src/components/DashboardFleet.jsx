import "./DashboardFleet.scss";
import { setIds as setCarIds } from "../features/cars/carsSlice";

import { useSelector, useDispatch } from "react-redux";
import Car from "./Car";
import { useEffect } from "react";

export default function DashboardFleet({ contract }) {
  const currentAddress = useSelector((state) => state.currentAddress.address);
  const carIds = useSelector((state) => state.cars.carIds);
  const role = useSelector((state) => state.registrator.role);
  const dispatch = useDispatch();

  const getCarIds = async () => {
    let ids;
    if (role === "owner") {
      ids = await contract.getOwnerCars(currentAddress);
    } else {
      ids = await contract.getAllCarIds();
    }
    dispatch(setCarIds({ ids }));
  };

  useEffect(() => {
    getCarIds();
  }, [contract, currentAddress, role]);

  return (
    <div className="container dashboard-fleet">
      <div className="fleet-container">
        {carIds.map((id) => (
          <Car key={id.toString()} contract={contract} carId={id} />
        ))}
      </div>
    </div>
  );
}

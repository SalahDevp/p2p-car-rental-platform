import { Outlet } from "react-router-dom";
import "./Layout.scss";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <div className="page">
        <Outlet />
      </div>
    </div>
  );
}

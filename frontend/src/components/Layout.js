import { Outlet } from "react-router-dom";
import "./Layout.scss";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="App">
      <Navbar />
      <div className="page">
        <Outlet />
      </div>
    </div>
  );
}

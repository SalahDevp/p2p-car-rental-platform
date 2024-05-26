import { Link } from "react-router-dom";
import("./Home.scss");

export default function Home() {
  return (
    <div className="container home-page">
      <div className="home-title-box">
        <h1 className="title">
          Rent the Perfect Car, Directly From Local Owners
        </h1>
        <h1 className="title-prefix">with no middlemen!</h1>
      </div>
      <div className="home-description-box">
        <p className="title-description">
          Connect your wallet and rent a car. Ride as far as you like. When you
          return it, you can easily pay with cryptocurrency
        </p>
      </div>
      <Link to="/dashboard" className="button-class choose-car">
        Get Started
      </Link>
    </div>
  );
}

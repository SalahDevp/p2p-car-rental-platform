import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.js";
import Home from "./components/Home.js";
import Dashboard from "./components/Dashboard.js";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;

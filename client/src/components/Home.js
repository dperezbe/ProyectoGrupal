import React from "react";
import Navegation from "./Navegation";
import SliderClasification from "./SliderClasification";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import CreateEvent from "./events/CreateEvent";
import Mainuser from "./user/Mainuser";

const Home = (props) => {
  return (
    <div className="container-fluid g-0">
      <div className="row g-0">
        <div className="col-sm-2 menu-clasificacion">
          <SliderClasification />
        </div>
        <div className="col-sm-10 main">
          <Navegation />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/event" element={<CreateEvent />} />
            <Route path="/user/:id" element={<Mainuser />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;

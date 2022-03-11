import React from "react";
import Navegation from "./Navegation";
import SliderClasification from "./SliderClasification";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Mainuser from "./user/Mainuser";
import MainSearch from "./search/MainSearch";
import EventInformation from "./events/EventInformation";
import MainCreateEvent from "./events/MainCreateEvent";

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
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<MainSearch />} />
            <Route path="/new" element={<MainCreateEvent />} />
            <Route path="/user/:id" element={<Mainuser />} />
            <Route path="/event/:id" element={<EventInformation />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;

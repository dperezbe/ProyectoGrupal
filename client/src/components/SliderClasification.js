import React from "react";

import Futbol from "../images/futbol.jpg";
import Tenis from "../images/tenis.jpg";
import Basquetbol from "../images/basquetbol.jpg";
import BaseBall from "../images/baseball.jpg";
import Running from "../images/running.jpg";


const SliderClasification = () => {
  return (
    <div className="slider-clasification">
      <ul>
        <li>
          <img id="futbol-img" src={Futbol}/>
        </li>
        <li>
          <img id="tenis-img" src={Tenis}/>
        </li>
        <li>
          <img id="basquetbol-img" src={Basquetbol}/>
        </li>
        <li>
          <img id="baseball-img" src={BaseBall}/>
        </li>
        <li>
          <img id="running-img" src={Running}/>
        </li>
      </ul>
    </div>
  );
};

export default SliderClasification;

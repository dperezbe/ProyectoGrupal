import React from "react";
import { UncontrolledCarousel } from "reactstrap";

import Futbol from "../images/futbol.jpg";
import Tenis from "../images/tenis.jpg";
import Basquetbol from "../images/basquetbol.jpg";

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
      </ul>
    </div>
  );
};

export default SliderClasification;

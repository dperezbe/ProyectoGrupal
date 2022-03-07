import React, { useState } from "react";
import Login from "./Login";
import Register from "./register";

const MainAccess = () => {
  const [option, setOption] = useState(true);
  
  return (
    <div className="main-access">
      <div className="container">
        <div className="row main-login">
          <div className="col-8">
            <div className="welcome-fit">
              <h1>iSport</h1>
              <p> Free Pickup Game Finder and Organizer</p>
            </div>
          </div>
          <div className="col login-fit">
            {option ? (
              <Login setOption={setOption} />
            ) : (
              <Register setOption={setOption} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAccess;

import React,{useContext} from "react";
import { useCookies } from "react-cookie";
import { authContext } from "../context/authContext";

const Navegation = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["usertoken"]);

  const { logged } = useContext(authContext);

  const logout = () => {
    sessionStorage.removeItem("USER_DATA");
    removeCookie("usertoken");
  };


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/dashboard">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/new">
                  New
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/search">
                  Search
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href= {'/user/' + logged.data._id}>
                  Account
                </a>
              </li>
            </ul>
            <div>Welcome {logged.data.username}</div>
            <a className="exit" href="/" onClick={() => logout()}>Salir</a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navegation;

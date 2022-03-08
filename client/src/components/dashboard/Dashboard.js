import "../../App.css";
import React from "react";
import TableToday from "./TableToday";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h3 id="tituloDashboard">Hoy es Domingo 6 de Mazo y tienes los siguientes eventos:</h3>
      <TableToday />
      <br></br>
      <h3 id="tituloDashboard">Estos son tus futuros eventos:</h3>
      <TableToday />
    </div>
  );
};

export default Dashboard;

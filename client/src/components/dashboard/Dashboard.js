import React from "react";
import TableToday from "./TableToday";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h3>Hoy es Domingo 6 de Mazo y tienes los siguientes eventos:</h3>
      <TableToday />
      <br></br>
      <h3>Estos son tus futuros eventos:</h3>
      <TableToday />
    </div>
  );
};

export default Dashboard;

import "../../App.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../../context/authContext";
import { Table } from "reactstrap";

const Mainuser = () => {
  const { id } = useParams();
  const { logged } = useContext(authContext);

  const [createdEvents, setCreatedEvents] = useState([]);
  const [whois, setWhois] = useState();

  useEffect(() => {
    axios
      .get(`/api/event/history/${id}`)
      .then((res) => {
        setCreatedEvents(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`/api/whois/${id}`)
      .then((res) => {
        setWhois(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const dateToday = new Date();

  return (
    <Table id="tableProfile">
      <thead>
        <tr id="titleProfile" align="center">
          <th>Name</th>
          <th>Email</th>
          <th>Birth Date</th>
          <th>Historial de eventos creados</th>
        </tr>
      </thead>

      <tbody>
        <tr align="center">
          <td>{whois?.username}</td>
          <td>{whois?.email}</td>
          <td>{whois?.birthdate.substr(0, 10).replace("T", " ")}</td>
          <td>
            {createdEvents?.map((t) => (
              <p key={t._id}>{t.eventName} { Date.parse(t.eventDate) > dateToday    ? <span className="comingsoon">Coming soon </span> : <span className="finalized">Finalized</span> }</p>
              
            ))}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Mainuser;

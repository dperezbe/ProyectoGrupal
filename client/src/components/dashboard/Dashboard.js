import React,{useContext, useState,useEffect} from "react";
import TableToday from "./TableToday";
import { authContext } from "../../context/authContext";
import axios from 'axios';

const Dashboard = () => {
  const date = new Date();
  const { logged } = useContext(authContext);
  const [eventToday,SetEventToday] = useState([]);
  const [eventFuture,SetEventFuture] = useState([]);

  useEffect(()=>{
    axios
    .get(`/api/events/today/${logged.data._id}`)
    .then((res) => {
      SetEventToday(res.data);
    })
    .catch((err) => console.log(err));   
  },[])

  useEffect(()=>{
    axios
    .get(`/api/events/future/${logged.data._id}`)
    .then((res) => {
      SetEventFuture(res.data);
    })
    .catch((err) => console.log(err));   
  },[])

  return (
    <div className="dashboard">
      <p id="showdate">{date.toDateString()}</p>
      <div className="table-events">
        <h3>Tus eventos para hoy</h3>
        <div  className="table-main">
        <TableToday data={eventToday} />
        </div>
      </div>
      <br></br>
      <div className="table-events">
        <h3>Tus futuros eventos</h3>
        <div className="table-main">
        <TableToday data={eventFuture} showdate={true}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

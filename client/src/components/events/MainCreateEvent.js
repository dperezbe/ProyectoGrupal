import CreateEventForm from "./CreateEventForm";
import TableMysEvents from "./TableMysEvents";
import axios from 'axios';
import React,{useEffect,useState, useContext} from 'react';
import { authContext } from "../../context/authContext";

const MainCreateEvent = () => {
    const { logged } = useContext(authContext);

    const [mysevents,SetMysevents] = useState([]);

    useEffect(() => {
        axios
        .get(`/api/member/${logged.data._id}`)
        .then((res) => SetMysevents(res.data))
        .catch((err) => console.log(err))
      }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-5">
                    <div className="create-event-form">
                        <CreateEventForm SetMysevents ={SetMysevents}/>
                    </div>
                </div>
                <div className="col-1">

                </div>
                <div className="col-5">
                   <TableMysEvents
                    data = {mysevents}
                    SetMysevents = {SetMysevents}
                    iduser = {logged.data._id}
                   />
                </div>
                <div className="col-1">
                   
                </div>
            </div>

        </div>

    );
}

export default MainCreateEvent;
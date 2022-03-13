import "../../App.css";
import axios from 'axios';
import React, {useContext, useEffect, useState}from 'react';
import { useParams } from "react-router-dom";
import { authContext } from '../../context/authContext';
import { Table } from "reactstrap";

const Mainuser = () => {
    const { id } = useParams();
    const{logged}= useContext(authContext)
    
    const[createdEvents, setCreatedEvents]=useState([])
    const[whois, setWhois]=useState()

    useEffect(()=>{
        axios.get(`/api/event/history/${id}`)
        .then(res=>{
            setCreatedEvents(res.data)
        })
        .catch(err=>console.log(err))
            
        axios.get(`/api/whois/${id}`)
        .then(res=>{
            setWhois(res.data.data)
        })
        .catch(err=>console.log(err))
    },[])

    return (
        <div>
            <div id="fields">
                    <p id="headerTable">En el main user:</p>
                    <p id="valueField">{id}</p>
                    <p id="editProfile"><a href="#"> Edit </a></p>
            </div>

            <div id="fields">
                    <p id="headerTable">Name:</p>
                    <p id="valueField">{whois?.username}</p>
            </div>

            <div id="fields">
                <p id="headerTable">Email:</p>
                <p id="valueField">{whois?.email}</p>
            </div>

            <div id="fields">
                <p id="headerTable">Birth Date:</p>
                <p id="valueField">{whois?.birthdate.substr(0, 10).replace('T', ' ')}</p>
            </div>

            <div id="fields">
                <p id="headerTable">Historial de eventos creados:</p>
                <h6 id="valueField">{createdEvents?.map(t => <p key={t._id}>{t.eventName}</p>)}</h6>
            </div>

            <div id="fields">
                <p id="headerTable">Otros deportes:</p><br/>
                    <p id="valueField">Future</p><br/>
                    <p id="valueField">Basketball</p><br/>
                    <p id="valueField">Voleyball</p>
            </div>
        </div>
    );
};

export default Mainuser;
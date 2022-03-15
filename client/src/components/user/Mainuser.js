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
    <Table id="tableProfile">
        <thead>
            <tr id="titleProfile" align="center">
                <th id="field1">ID.</th>
                <th id="field2">Name.</th>
                <th id="field3">Email.</th>
                <th id="field4">Birth Date.</th>
                <th id="field5">Historial de eventos creados.</th>
                <th id="field7"><a href="#"> Edit </a></th>
            </tr>
        </thead>

        <tbody>
            <tr align="center">
                <th id="field1">{id}</th> 
                <th id="field2">{whois?.username}</th>
                <th id="field3">{whois?.email}</th>
                <th id="field4">{whois?.birthdate.substr(0, 10).replace('T', ' ')}</th>
                <th id="field5">{createdEvents?.map(t => <p key={t._id}>{t.eventName}</p>)}</th>
            </tr>
        </tbody>
    </Table>
    );
};

export default Mainuser;
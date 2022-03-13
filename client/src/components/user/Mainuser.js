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
            <Table id="tableProfile">
                <tr>
                    <td id="headerTable">En el main user:</td>
                    <td id="valueField">{id}</td>
                    <td><a href="#"> Edit </a></td>
                </tr>

                <tr>
                    <td id="headerTable">Name: </td>
                    <td id="valueField">{whois?.username}</td>
                </tr>

                <tr>
                    <td id="headerTable">Email:</td>
                    <td id="valueField">{whois?.email}</td>
                </tr>

                <tr>
                    <td id="headerTable">Birth Date:</td>
                    <td id="valueField">{whois?.birthdate.substr(0, 10).replace('T', ' ')}</td>
                </tr>

                <tr>
                    <td id="headerTable"><span>Historial de eventos creados:</span></td>
                    <td id="valueField">{createdEvents?.map(t => <p key={t._id}>{t.eventName}</p>)}
                <p> Ultimate frisbee</p></td>
                </tr>

                <tr>
                    <td id="headerTable">Otros deportes:</td>


                    <td id="valueField">
                        <td>
                            Future <br/>
                            Basketball <br/>
                            Voleyball <br/>
                        </td>
                    </td>
                </tr>                
            </Table>
        </div>
    );
};

export default Mainuser;
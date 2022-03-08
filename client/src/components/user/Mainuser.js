import "../../App.css";
import axios from 'axios';
import React, {useContext, useEffect, useState}from 'react';
import { useParams } from "react-router-dom";
import { authContext } from '../../context/authContext';
import { Table } from "reactstrap";

const Mainuser = () => {
    const { id } = useParams();
    const{logged}= useContext(authContext)
    
    const[detalles, setDetalles]=useState([])
    useEffect(()=>{
        axios.get(`/api/event/history/${id}`)
        .then(res=>{
            setDetalles(res.data)
        })
        .catch(err=>console.log(err))
            
    },[])

    return (
        <div>
            <Table id="tableProfile">
                <tr>
                    <td>En el main user</td>
                    <td>{id}</td>
                    <td><a href="#"> Edit </a></td>
                </tr>

                <tr>
                    <td>Name: </td>
                    <td>{logged.data.username}</td>
                </tr>

                <tr>
                    <td>Email</td>
                    <td>{logged.data.email}</td>
                </tr>

                <tr>
                    <td>Birth Date</td>
                    <td>{logged.data.birthdate}</td>
                </tr>

                <tr>
                    <td><span>Historial de eventos creados</span></td>
                    <td>{detalles?.map(t => <p key={t._id}>{t.eventName}</p>)}
                <p> Ultimate frisbee</p></td>
                </tr>

                <tr>
                    <td>Otros deportes</td>
                    <td>Future</td>
                    <td>Basketball</td>
                    <td>Voleyball</td>
                </tr>                
            </Table>
            <section>
                <p> Name: {logged.data.username}</p>
                <p> email: {logged.data.email}</p>
                <p> birthdate: {logged.data.birthdate}</p>
            </section>
            <a href="#"> Edit </a>
            <section>
                <span>Historial de eventos creados</span>
                {detalles?.map(t => <p key={t._id}>{t.eventName}</p>)}
                <p> Ultimate frisbee</p>
            </section>
            <section>
                <span>Future</span>
                <p>Basketball</p>
                <p>Volleyball</p>
            </section>
        </div>
    );
};

export default Mainuser;
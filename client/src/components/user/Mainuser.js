import axios from 'axios';
import React, {useContext, useEffect, useState}from 'react';
import { useParams } from "react-router-dom";
import { authContext } from '../../context/authContext';

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
           
            <h1>En el main user {id}</h1>
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
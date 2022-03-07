import React, {useContext}from 'react';
import { useParams } from "react-router-dom";
import { authContext } from '../../context/authContext';

const Mainuser = () => {
    const { id } = useParams();
    const{logged}= useContext(authContext)
    return (
        <div>
           
            <h1>En el main user {id}</h1>
            <section>
                <p> Name: Valentina</p>
                <p> email: {logged.data.email}</p>
                <p> birthdate: {logged.data.birthdate}</p>
            </section>
            <a href="#"> Edit </a>
            <section>
                <span>Event History</span>
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
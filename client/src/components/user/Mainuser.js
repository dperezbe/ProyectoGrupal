import React from 'react';
import { useParams } from "react-router-dom";

const Mainuser = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>En el main user {id}</h1>
        </div>
    );
};

export default Mainuser;
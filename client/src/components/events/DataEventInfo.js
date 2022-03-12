import React from 'react';

const DataEventInfo = ({data}) => {
    console.log(data);
    return (
        <div className='event-description'>
            <h3>Descripción del evento</h3>
            {data?.eventDescripcion ? <p>{data?.eventDescripcion}</p> : <p>Event without description</p>}
        </div>
    );
};

export default DataEventInfo;
import React from 'react';

const DataEventDate = ({data}) => {
    return (
        <div className='event-date'>
            <p><b>Title:</b> {data?.eventName}</p>
            <p><b>Category:</b> {data?.eventCategory}</p>
            <p><b>Location: </b>{data?.eventLocation}</p>
            <p><b>Total Members:</b> {data?.eventMemberTotal}</p>
            <p><b>Confirmed Users: </b>{data?.eventMembers.length}</p>
            <p><b>Event Owner: </b>{data?.eventOwner?.username}</p>
            <p><b>Event Date:</b> {data?.eventDate.substr(0, 16).replace('T', ' ')}</p>
        </div>
    );
};

export default DataEventDate;
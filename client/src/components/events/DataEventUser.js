import React from 'react';

const DataEventUser = ({data}) => {
    return (
        <div className='event-user'>
            <h3>Usuarios</h3>
            {data?.eventMembers.map(t => <p key={t.username}>{t.username} - {t.email} <span className="btn-available">Confirmed</span></p>)}
        </div>
    );
};

export default DataEventUser;
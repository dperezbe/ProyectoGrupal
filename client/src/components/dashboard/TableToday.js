import React from "react";
import { Table } from "reactstrap";

const TableToday = ({ data,showdate }) => {
  const fecha = new Date();

  return (
    <Table bordered borderless hover responsive size="" striped style={{"margin":"0"}}>
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Location Name</th>
          <th>Attendees</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((i) => (
          <tr key={i._id}>
            <td><a className="a-decoration" href={'/event/'+i._id}>{i.eventName}</a></td>
            <td>{i.eventLocation}</td>
            <td>{i.eventMembers.length} / {i.eventMemberTotal} {i.eventMembers.length === i.eventMemberTotal ? <span className="btn-full">Full</span>:<span className="btn-available">Available</span> } </td>
            {showdate ? <td>{i.eventDate.substr(0, 16).replace('T', ' ')}</td>: <td>{i.eventDate.substr(11, 5)}</td>}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableToday;

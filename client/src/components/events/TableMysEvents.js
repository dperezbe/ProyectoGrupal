import React from "react";
import axios from "axios";
import { Table } from "reactstrap";
import Swal from 'sweetalert2';

const TableMysEvents = ({ data, iduser, SetMysevents }) => {
  const deleteEvent = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "El evento será eliminado",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            axios
            .delete(`/api/event/${id}`)
            .then((res) => {
              axios
                .get(`/api/member/${iduser}`)
                .then((res) => SetMysevents(res.data))
                .catch((err) => console.log(err));
            })
          Swal.fire(
            'Deleted!',
            'Evento eliminado',
            'success'
          )
        }
      })
   
      .catch((err) => console.log(err));
  };
  return (
    <div className="mys-events">
      <h3>Mis eventos</h3>
      <Table
        bordered
        borderless
        hover
        responsive
        size=""
        striped
        style={{ margin: "0" }}
      >
        <thead>
          <tr>
            <th>Event Name</th>
          </tr>
        </thead>
        <tbody>
          {data?.filter((t) => t.eventOwner === iduser).map((i) => (
            <tr key={i._id}>
              <td>
                <a className="a-decoration" href={"/event/" + i._id}>
                  {i.eventName}
                </a>
              </td>
              <td className="a-decoration " onClick={() => deleteEvent(i._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash-fill delete-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableMysEvents;

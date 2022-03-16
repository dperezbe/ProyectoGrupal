import React, { useState, useEffect, useContext } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import { authContext } from "../../context/authContext";
import Swal from 'sweetalert2'

const TableSearch = () => {
  const { logged } = useContext(authContext);
  const [searchByName, setSearchByName] = React.useState("");
  const [searchByCategory, setSearchByCategory] = React.useState("");

  const handleSearch = (event) => {
    setSearchByName(event.target.value);
  };

  const handleSearchCategory = (event) => {
    setSearchByCategory(event.target.value);
  };

  const [datos, setDatos] = useState({
    pageSize: 5,
    pageIndex: 0,
    items: [],
  });

  const alertfull = () =>{
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'No hay más cupos para este evento',
      showConfirmButton: false,
      timer: 1500
    })
  }
  const joinevent = (idevent) => {
    axios
      .put(`api/members/event/${idevent}`, { eventMembers: logged.data._id })

      .then((res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro al evento exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
        axios
        .get(`/api/events`)
        .then((res) => {
          setDatos({ ...datos, items: res.data });
        })
        .catch((err) => console.log(err));

      })

      .catch((err) =>
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error al registrarse al evento',
        showConfirmButton: false,
        timer: 1500
      })
      );
  };

  useEffect(() => {
    axios
      .get(`/api/events`)
      .then((res) => {
        setDatos({ ...datos, items: res.data });
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePrevPageClick = (event) => {
    setDatos((prevState) => ({
      ...datos,
      pageIndex: prevState.pageIndex > 0 ? prevState.pageIndex - 1 : 0,
    }));
  };

  const handleNextPageClick = (event) => {
    setDatos((prevState) => ({
      ...datos,
      pageIndex:
        prevState.pageIndex <
        Math.floor(prevState.items.length / prevState.pageSize)
          ? prevState.pageIndex + 1
          : prevState.pageIndex,
    }));
  };

  return (
    <div>
      <div>
        <div className="form-search-eve">
          <input
            placeholder="Event Name"
            className="search-event"
            onChange={handleSearch}
          />
          <select
            className="search-event-select search-even-cat"
            name="eventCategory"
            aria-label="Default select example"
            onChange={handleSearchCategory}
          >
            <option value="">Todas las categoría </option>
            <option value="Futbol">Futbol</option>
            <option value="Basquetbol">Basquetbol</option>
            <option value="Tenis">Tenis</option>
            <option value="Running">Running</option>
            <option value="Baseball">Baseball</option>
          </select>
        </div>
        <Table
          bordered
          borderless
          hover
          responsive
          size=""
          striped
          className="table-search table-main"
        >
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Location Name</th>
              <th>Attendees</th>
              <th>Date</th>
              <th>Category</th>
              <th>Creator</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {datos.items
              ? datos.items
                  .slice(
                    datos.pageIndex * datos.pageSize,
                    datos.pageIndex * datos.pageSize + datos.pageSize
                  )
                  .filter((ite) => ite.eventName.includes(searchByName))
                  .filter((ite) => ite.eventCategory.includes(searchByCategory))
                  .map((item) => (
                    <tr key={item._id}>
                      <td>
                        <a className="a-decoration" href={"/event/" + item._id}>
                          {item.eventName}
                        </a>
                      </td>
                      <td>{item.eventLocation}</td>
                      <td className="attendees">
                        {item.eventMembers.length} / {item.eventMemberTotal}
                      </td>
                      <td>{item.eventDate.substr(0, 16).replace("T", " ")}</td>
                      <td>{item.eventCategory}</td>
                      <td>
                        <a
                          className="a-decoration"
                          href={"/user/" + item.eventOwner._id}
                        >
                          {item.eventOwner.username}
                        </a>
                      </td>
                      <td>
                        {item.eventMembers.length >= item.eventMemberTotal ? (
                          <span className="btn-full" onClick={() => alertfull()}>Event is full</span>
                        ) : (
                          <span
                            className="btn-available"
                            onClick={() => joinevent(item._id)}
                          >
                            Join to event
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
              : null}
          </tbody>
        </Table>

        <div className="pageclick">
          <button onClick={(event) => handlePrevPageClick(event)}>
            Prev page
          </button>
          <button onClick={(event) => handleNextPageClick(event)}>
            Next page
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableSearch;

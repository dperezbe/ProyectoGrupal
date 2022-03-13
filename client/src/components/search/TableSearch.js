import React, { useState, useEffect, useContext } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import { authContext } from "../../context/authContext";

const TableSearch = () => {
  const { logged } = useContext(authContext);

  const [datos, setDatos] = useState({
    pageSize: 5,
    pageIndex: 0,
    items: [],
  });

  const joinevent = (idevent) => {
    axios
      .put(`api/members/event/${idevent}`, { eventMembers: logged.data._id })
      .then((res) => {console.log(res)})
      .catch((err) => console.log(err));
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
          <input placeholder="Event Name" className="search-event" />
          <h6>Search By</h6>
          <select
            className="search-event search-even-cat"
            name="eventCategory"
            aria-label="Default select example"
          >
            <option value="">Todas las categoría </option>
            <option value="Futbol">Futbol</option>
            <option value="Basquetbol">Basquetbol</option>
            <option value="Tenis">Tenis</option>
            <option value="Running">Running</option>
            <option value="Baseball">Baseball</option>
          </select>
          <input type="button" value="Search" className="btn-search" />
        </div>
        <Table
          bordered
          borderless
          hover
          responsive
          size=""
          striped
          className="table-search"
        >
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Location Name</th>
              <th>Attendees</th>
              <th>Date</th>
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
                  .map((item) => (
                    <tr key={item._id}>
                      <td><a className="a-decoration" href={'/event/'+item._id}>{item.eventName}</a></td>
                      <td>{item.eventLocation}</td>
                      <td className="attendees">
                        {item.eventMembers.length} / {item.eventMemberTotal}
                      </td>
                      <td>{item.eventDate.substr(0, 16).replace("T", " ")}</td>
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
                          <span className="btn-full">Event is full</span>
                        ) : (
                          <span className="btn-available" onClick={() => joinevent(item._id)} >Join to event</span>
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

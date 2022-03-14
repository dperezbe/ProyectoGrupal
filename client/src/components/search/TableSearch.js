import React, { useState, useEffect, useContext } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import { authContext } from "../../context/authContext";
import Swal from 'sweetalert2'
import "bootstrap/dist/css/bootstrap.min.css";


const TableSearch = () => {
  const { logged } = useContext(authContext);
  const [usuarios, setUsuarios]=useState([]);
  const [tablaUsuarios, setTablaUsuarios]=useState([]);
  const [busqueda, setBusqueda]=useState("");

  const [datos, setDatos] = useState({
    pageSize: 5,
    pageIndex: 0,
    items: [],
  });

  const joinevent = (idevent) => {
    axios
      .put(`api/members/event/${idevent}`, { eventMembers: logged.data._id })
      .then((res) => {
        console.log(res)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se unió al evento  ',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((err) => {

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo unir al evento !',
        })
      }
      );
  };

  useEffect(() => {
    axios
      .get(`/api/events`)
      .then((res) => {
        setDatos({ ...datos, items: res.data });
        peticionGet();
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

  const peticionGet=async()=>{
    await axios.get("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      setUsuarios(response.data);
      setTablaUsuarios(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=tablaUsuarios.filter((elemento) =>{
      if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
        return elemento;
      }    
    });
    setUsuarios(resultadosBusqueda);
  }
    

  return (
    <div>
      <div>

        <div className="containerInput">
          <input className="form-control inputBuscar" value={busqueda} placeholder="Busqueda por Nombre del evento." onChange={handleChange}/>
        </div>
        <div className="table-responsive">
        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Telefono</th>
              <th>Nombre de Usuario</th>
              <th>Correo</th>
              <th>Sitio Web</th>
              <th>Ciudad</th>
              <th>Empresa</th>             
            </tr>
          </thead>

          <tbody>
              {usuarios && 
              usuarios.map((usuario)=>(
                <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.name}</td>
                    <td>{usuario.phone}</td>
                    <td>{usuario.username}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.website}</td>
                    <td>{usuario.address.city}</td>
                    <td>{usuario.company.name}</td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>








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
          className="table-search table-main"
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
                    <td><a className="a-decoration" href={'/event/' + item._id}>{item.eventName}</a></td>
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

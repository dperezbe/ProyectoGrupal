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
  const [busqueda2, setBusqueda2]=useState("");

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
    //await axios.get("https://jsonplaceholder.typicode.com/users")
    await axios.get("/api/events")
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

  const handleChange2=e=>{
    setBusqueda2(e.target.value);
    filtrar2(e.target.value);
  }

  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=tablaUsuarios.filter((elemento) =>{
      if(elemento.eventName.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
        return elemento;
      }    
    });
    setUsuarios(resultadosBusqueda);
  }

  const filtrar2=(terminoBusqueda2)=>{
    if(terminoBusqueda2 == ""){
      setUsuarios(tablaUsuarios);
    }else{
      var resultadosBusqueda2=tablaUsuarios.filter((elemento) =>{
      //console.log(elemento.eventCategory);
      if(elemento.eventCategory == terminoBusqueda2){
        return elemento;
      }
    });
    //console.log(resultadosBusqueda2);
    setUsuarios(resultadosBusqueda2);
    }    
  }

  return (
    <div>
      <div>
        <div className="containerInput">
          <input className="form-control inputBuscar" value={busqueda} placeholder="Find for event name." onChange={handleChange}/>
        </div>
        <br/>
        <select className="search-event search-even-cat" name="eventCategory" aria-label="Default select example" onChange={handleChange2} value={busqueda2}>
            <option value="">All Categories.</option>
            <option value="Futbol">Futbol</option>
            <option value="Basquetbol">Basquetbol</option>
            <option value="Tenis">Tenis</option>
            <option value="Running">Running</option>
            <option value="Baseball">Baseball</option>
          </select>

        <div className="table-responsive">
        <br/>
        <p align="center">Information about events.</p>
        <br/>
        <table className="table table-sm table-bordered">
          <thead align="center">
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Date</th>
                <th>Category</th>
                <th>Creator</th>
                <th>Action</th>
              </tr>
          </thead>

          <tbody align="justify">
              {usuarios && 
              usuarios.map((usuario)=>(
              <tr>
                <td>{usuario.eventName}</td>
                <td>{usuario.eventLocation}</td>
                <td>{usuario.eventDate.substr(0, 16).replace("T", " ")}</td>
                <td>{usuario.eventCategory}</td>
                <td>{usuario.eventOwner.username}</td>
                <td>
                  {usuario.eventMembers.length >= usuario.eventMemberTotal ? (
                    <span className="btn-full">Event is full</span>
                  ) : (
                    <span className="btn-available" onClick={() => joinevent(usuario._id)} >Join to event</span>
                  )}
                </td>
            </tr>
              ))}
            </tbody>
        </table>
      </div>
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

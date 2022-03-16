import "../../App.css";
import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { authContext } from "../../context/authContext";
import axios from "axios";
import Swal from 'sweetalert2'

const CreateEventForm = ({SetMysevents}) => {

  const { logged } = useContext(authContext);

  const eventDetails = {
    eventName: "",
    eventLocation: "",
    eventMemberTotal: "",
    eventDate: "",
    eventDescripcion: "",
    eventMembers: logged.data._id
  }

  const { eventName, eventLocation, eventMemberTotal, eventDate, eventDescripcion, eventMembers } = eventDetails;



  const [newevent, setNewevent] = useState({ eventName, eventLocation, eventMemberTotal, eventDate, eventDescripcion, eventMembers, eventOwner: logged.data._id });

  const handleForm = (e) => {
    setNewevent({ ...newevent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newevent.eventName === '' || newevent?.eventName?.length < 6) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: 'Nombre del evento debe contener al menos de 6 caracteres !',
      })
      return;
    }
    if (newevent.eventLocation === '' || newevent?.eventLocation?.length < 4) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: 'La localización debe contener al menos 4 caracteres!',
      })
      return;
    }
    if (newevent.eventMemberTotal === '' || newevent?.eventMemberTotal < 2) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: 'El total de miembros debe ser mayor que 2',
      })
      return;
    }

    if (newevent.eventDate === '') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: 'La fecha no es valida !',
      })
      return;
    }
    if (newevent.eventDescripcion === '') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: 'Falta descripción del evento !',
      })
      return;
    }

    axios
      .post("/api/event/create", newevent)
      .then((res) => {
        if (res.data) {

          axios
          .get(`/api/member/${logged.data._id}`)
          .then((res) => SetMysevents(res.data))
          .catch((err) => console.log(err))

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Evento creado con exito ',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo crear el evento  !',
          })
        }
      }
      )
      .catch((err) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo crear el evento  !',
        })
      })
  };


  return (
    <div>
      <h3 id="titleNew">Crea un nuevo evento</h3>
      <Form id="formNew" onSubmit={handleSubmit}>
        <FormGroup>
          <Label className="labelForm" for="eventName">Nombre del evento</Label>
          <Input name="eventName" onChange={handleForm} />
        </FormGroup>
        <div className="container-fluid g-0">
          <div className="row g-0">
            <div className="col-5">
              <FormGroup>
                <Label className="labelForm" for="eventName">Categoría</Label>
                <select className="form-select" name="eventCategory" aria-label="Default select example" onChange={handleForm}>
                  <option value="" >Otra categoría</option>
                  <option value="Futbol">Futbol</option>
                  <option value="Basquetbol">Basquetbol</option>
                  <option value="Tenis">Tenis</option>
                  <option value="Running">Running</option>
                  <option value="Baseball">Baseball</option>
                </select>
              </FormGroup>
            </div>
            <div className="col-2"></div>
            <div className="col-5">
              <FormGroup>
                <Label className="labelForm" for="eventLocation">Lugar del evento</Label>
                <Input name="eventLocation" onChange={handleForm} />
              </FormGroup>
            </div>
          </div>
        </div>
        <div className="container-fluid g-0">
          <div className="row g-0">
            <div className="col-5">

              <FormGroup>
                <Label className="labelForm" or="eventMemberTotal">Total de jugadores</Label>
                <Input name="eventMemberTotal" onChange={handleForm} />
              </FormGroup>
            </div>
            <div className="col-2">
            </div>
            <div className="col-5">
              <FormGroup>
                <Label className="labelForm" for="eventDate">Día del evento</Label>
                <Input type="datetime-local" name="eventDate" onChange={handleForm} />
              </FormGroup>
            </div>
          </div>
        </div>
        <FormGroup className="position-relative">
          <Label className="labelForm" for="eventDescripcion">Decripción del evento</Label>
          <Input name="eventDescripcion" onChange={handleForm} />
        </FormGroup>
        <div>
          <Button active block color="primary" type="submit">
            Crear evento
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateEventForm;

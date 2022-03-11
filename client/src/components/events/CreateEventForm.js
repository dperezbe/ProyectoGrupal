import "../../App.css";
import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { authContext } from "../../context/authContext";
import axios from "axios";

const CreateEventForm = () => {

  const { logged } = useContext(authContext);

  const eventDetails={
    eventName:"",
    eventLocation:"",
    eventMemberTotal:"",
    eventDate:"",
    eventDescripcion:"",
    eventMembers: logged.data._id
  }

  const {eventName,eventLocation,eventMemberTotal,eventDate,eventDescripcion,eventMembers} = eventDetails;



  const [newevent, setNewevent] = useState({eventName,eventLocation,eventMemberTotal,eventDate,eventDescripcion,eventMembers, eventOwner: logged.data._id });

  const handleForm = (e) => {
    setNewevent({ ...newevent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(newevent.eventName === '' || newevent?.eventName?.length<6){
        return;
    }
    if(newevent.eventLocation ==='' || newevent?.eventLocation?.length<4){
      return;
    }
    if(newevent.eventMemberTotal ==='' || newevent?.eventMemberTotal<2){
      return;
    }
    
    if(newevent.eventDate ===''){
      return;
    }
    if(newevent.eventDescripcion ===''){
      return;
    }

    axios
      .post("/api/event/create", newevent)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  
  return (
    <div>
      <h1 id="titleNew">Crea un nuevo evento</h1>
      <Form id="formNew" onSubmit={handleSubmit}>
        <FormGroup>
          <Label id="labelForm" for="eventName">Nombre del evento</Label>
          <Input name="eventName" onChange={handleForm} />
        </FormGroup>
        <FormGroup>
        <Label id="labelForm" for="eventName">Categoría</Label>
        <select className="form-select" name ="eventCategory" aria-label="Default select example" onChange={handleForm}>
          <option value="" >Otra categoría</option>
          <option value="Futbol">Futbol</option>
          <option value="Basquetbol">Basquetbol</option>
          <option value="Tenis">Tenis</option>
          <option value="Running">Running</option>
          <option value="Baseball">Baseball</option>
        </select>
        </FormGroup>
        <FormGroup>
          <Label id="labelForm" for="eventLocation">Lugar del evento</Label>
          <Input name="eventLocation" onChange={handleForm} />
          {newevent.eventLocation.length<4?<p className="pAlert">Debe contener al menos 4 caracteres</p>:null}<br></br>
        </FormGroup>
        <FormGroup>
          <Label id="labelForm" for="eventMemberTotal">Total de jugadores</Label>
          <Input name="eventMemberTotal" onChange={handleForm} />
          {newevent.eventMemberTotal<2?<p className="pAlert">Tiene que ser mayor que 2 </p>:null} <br></br>
        </FormGroup>
        <FormGroup>
          <Label id="labelForm" for="eventDate">Día del evento</Label>
          <Input type="datetime-local" name="eventDate" onChange={handleForm} />
          {newevent.eventDate?null:<p className="pAlert">Este campo no puede estar vacío </p> } <br></br>
        </FormGroup>
        <FormGroup className="position-relative">
          <Label id="labelForm" for="eventDescripcion">Decripción del evento</Label>
          <Input name="eventDescripcion" onChange={handleForm} />
          {newevent.eventDescripcion?null:<p className="pAlert">Este campo no puede estar vació </p>} <br></br>
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

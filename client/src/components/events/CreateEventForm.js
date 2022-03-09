import "../../App.css";
import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { authContext } from "../../context/authContext";
import axios from "axios";

const CreateEventForm = () => {
  const { logged } = useContext(authContext);

  const [newevent, setNewevent] = useState({ eventOwner: logged.data._id });

  const handleForm = (e) => {
    setNewevent({ ...newevent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(newevent.eventName === ''){
        return;
    }
    if(newevent.eventLocation ===''){
      return;
    }
    if(newevent.eventMemberTotal ===''){
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
          <Label id="labelForm" for="eventLocation">Lugar del evento</Label>
          <Input name="eventLocation" onChange={handleForm} />
        </FormGroup>
        <FormGroup>
          <Label id="labelForm" for="eventMemberTotal">Total de jugadores</Label>
          <Input name="eventMemberTotal" onChange={handleForm} />
        </FormGroup>
        <FormGroup>
          <Label id="labelForm" for="eventDate">Día del evento</Label>
          <Input type="datetime-local" name="eventDate" onChange={handleForm} />
        </FormGroup>
        <FormGroup className="position-relative">
          <Label id="labelForm" for="eventDescripcion">Decripción del evento</Label>
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

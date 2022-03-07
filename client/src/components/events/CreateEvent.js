import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const CreateEvent = () => {
  const [newevent, setNewevent] = useState();

  const handleForm = (e) => {
    setNewevent({ ...newevent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newevent);
  };

  return (
    <div>
      <h1>Crea un nuevo evento</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="eventName">Nombre del evento</Label>
          <Input name="eventName" onChange={handleForm} />
        </FormGroup>
        <FormGroup>
          <Label for="eventLocation">Lugar del evento</Label>
          <Input name="eventLocation" onChange={handleForm} />
        </FormGroup>
        <FormGroup>
          <Label for="eventMemberTotal">Total de jugadores</Label>
          <Input name="eventMemberTotal" onChange={handleForm} />
        </FormGroup>
        <FormGroup>
          <Label for="eventDate">Día del evento</Label>
          <Input type="datetime-local" name="eventDate" onChange={handleForm} />
        </FormGroup>
        <FormGroup className="position-relative">
          <Label for="eventDescripcion">Decripción del evento</Label>
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

export default CreateEvent;

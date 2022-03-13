import React, { useState,useContext,useEffect } from "react";
import MessagesChat from "./MessagesChat";
import { Input, Button, Form } from "reactstrap";
import { authContext } from "../../context/authContext";
import axios from 'axios';

const MainChatEvent = ({ id }) => {
    const { logged } = useContext(authContext);
    const [messages, SetMessages] = useState([]);

    const getMessages = () => {
        axios
        .get(`/api/chat/${id}`)
        .then((res) => {
          SetMessages(res.data);
        })
        .catch((err) => console.log(err));
    }
    useEffect(() => {
        getMessages();
      }, []);

    const [message,SetMessage] = useState({
        user:logged.data._id,
        event:id
    });

    const SubmitMessage = e =>{
        e.preventDefault();
        axios
        .post(`/api/chat`,message)
        .then((res) => {
            getMessages();
        })
        .catch((err) => console.log(err));   
    }

    const handleMessage = e => {
        SetMessage({...message,[e.target.name] : e.target.value});
    }

  return (
    <div className="chat-event">
      <MessagesChat messages = {messages}/>
      <Form onSubmit={SubmitMessage}>
      <div className="btn-send-form-message">
        <Input
        name = "message"
        onChange={handleMessage}
        />
        <Button  color="primary" className="btn-send-input" type="submit" >Enviar Mensaje</Button>
      </div>
      </Form>
    </div>
  );
};

export default MainChatEvent;

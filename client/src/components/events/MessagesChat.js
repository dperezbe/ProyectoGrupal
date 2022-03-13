import React, { useState , useEffect} from "react";
import { Table } from "reactstrap";


const MessagesChat = ({messages}) => {

 

  return (
    <div>
      <Table striped>
        <tbody>
              {messages?.map((i) => (
                <tr key={i._id}>
                  <td>{i.user.username}</td>
                  <td>{i.message}</td>
                </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MessagesChat;

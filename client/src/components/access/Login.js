import React, { useState } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Register from "./register";

const Login = ({ setOption }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    errPassword: "",
  });

  const actualizarLoginForm = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    if (name === "password") {
      if (value.length < 6) {
        setErrors({
          ...errors,
          errPassword: "*Password must be at least 6 characters",
        });
      } else {
        setErrors({
          ...errors,
          errPassword: "",
        });
      }
    }
  };
  const loginUser = (e) => {
    e.preventDefault();
    axios
      .post("/api/login", inputs)
      .then((res) => console.log(res.data))
      .catch((res) => console.log(res));
  };

  const changeOption = () => {
    setOption(false);
  };

  return (
    <div>
      <div className="loginform">
        <div className="login-fit">
          <h2>Inicio de sesion</h2>
          <Form onSubmit={loginUser}>
            <FormGroup>
              <Label>Email:</Label>
              <Input
                type="email"
                name="email"
                value={inputs.email}
                onChange={actualizarLoginForm}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Password:</Label>
              <Input
                type="password"
                name="password"
                value={inputs.password}
                onChange={actualizarLoginForm}
              ></Input>
              {errors && <p>{errors.errPassword}</p>}
              <Button type="submit" className="btn-login">
                Login
              </Button>
            </FormGroup>
            <div className="option" onClick={() => changeOption()}>
              Registrarse
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

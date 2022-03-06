import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormGroup , Label, Input, Button} from "reactstrap"


const Login = props => {
    const {setLogin} = props;

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        errPassword: ""
    }); 

    const actualizarLoginForm = e => {
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value});
        if ( name === "password" ){
            if ( value.length < 6 ){
                setErrors({
                    ...errors, 
                    errPassword: "*Password must be at least 6 characters"
                });
            } else {
                setErrors({
                    ...errors, 
                    errPassword: ""        
                });
            } 
        };
    }
    const loginUser = e => {
        e.preventDefault();
        axios.post('/api/login' , inputs)
            .then(res => console.log(res.data))
            .catch(res => console.log(res))
    };


    return (
        <div>
            <h1>
                Login
            </h1>
            <Form onSubmit={loginUser}>
                <FormGroup>
                    <Label>Email:</Label>
                    <Input type='email' name='email' value={inputs.email} onChange={actualizarLoginForm}></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Password:</Label>
                    <Input type='password' name='password' value={inputs.password} onChange={actualizarLoginForm}></Input>
                    {
                    errors &&
                    <p >{errors.errPassword}</p>
                    }
                    <Button type="submit" >Login</Button> 
                </FormGroup>

            </Form>
        </div>
    );
};

export default Login;
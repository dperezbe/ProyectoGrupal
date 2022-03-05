import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormGroup , Label, Input, Button} from "reactstrap"


const Register = props => {

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        birthdate: ""
    }

    const erroresIniciales = {
        firstName: "",
        lastName: "",
        errEmail: "",
        errPassword: ""
    }  

    const[inputs, setInputs]= useState(initialValues);
    const [errors, setErrors] = useState(erroresIniciales);
    const {onSubmitProp} = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitProp(inputs);
        setInputs(initialValues);
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs({...inputs, [name]: value})
        if (name === 'confirmPassword') {
            if (inputs.password !== value) {
                setErrors({
                    ...errors,
                    errConfirmPassword: "*Passwords must match"
                });
            } else {
                setErrors({
                    ...errors,
                    errConfirmPassword: ''
                });
            }
        }
    }

    const enviarRegistro = (e) => {
        e.preventDefault();
        axios.post('http:/api/user',inputs)
        .then(res=>{
            setInputs(initialValues)})
        .catch(err=>console.log(err))
    }

    return (
        <div >
            <h1>iSport</h1>
            <p> Free Pickup Game Finder and Organizer</p>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Nombre:</Label>
                    <Input name='firstname' value={inputs.firstName} onChange={handleChange}></Input>
                    {errors['firstName'] ? <p className="errors_reg_log">{errors['firstName'].message}</p>: ''}             
                </FormGroup>
                <FormGroup>
                    <Label>Apellido:</Label>
                    <Input name='lastName' value={inputs.lastName} onChange={handleChange}></Input>
                    {errors['lastName'] ? <p className="errors_reg_log">{errors['lastName'].message}</p>: ''}
                </FormGroup>
                <FormGroup>
                    <Label>Email:</Label>
                    <Input name='email' value={inputs.email} onChange={handleChange}></Input>
                    {errors['email'] ? <p className="errors_reg_log">{errors['email'].message}</p>: ''}
                </FormGroup>
                <FormGroup>
                    <Label>Birthdate:</Label>
                    <Input  type="date" name='birthdate' value={inputs.birthdate} onChange={handleChange}></Input>
                </FormGroup>
                <Button type="submit" onClick={enviarRegistro}>Register</Button>
            </Form>


           

        </div>
    );
};

export default Register;
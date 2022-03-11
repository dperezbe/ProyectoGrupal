import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormGroup , Label, Input, Button} from "reactstrap"
import Swal from 'sweetalert2'


const Register = ({setOption}) => {

    const initialValues = {
        userName: "",
        email: "",
        password: "",
        confirmPassword:"",
        birthdate: ""
    }

    const erroresIniciales = {
        firstName: "",
        errEmail: "",
        errPassword: "",
        errConfirmPassword:"",
    }  

    const[inputs, setInputs]= useState();
    const [errors, setErrors] = useState(erroresIniciales);

    const handleSubmit = (e) => {
        e.preventDefault();
        setInputs(initialValues);
    }

    const handleChange = (e) => {
        const {name, value} = e.target
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
        setInputs({...inputs, [e.target.name]:e.target.value})

    }

    const enviarRegistro = (e) => {
        e.preventDefault();
        axios.post('/api/user',inputs)
        .then(res=>{
            setInputs(initialValues)})
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Registrado con exito',
                showConfirmButton: false,
                timer: 1500
              })
              setOption(true)
        .catch(err=>console.log(err))
    }
    const changeOption = () =>{
        setOption(true);
      }

    return (
        <div className='registerform'>
           <h2>Registro</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>UserName:</Label>
                    <Input name='username' onChange={handleChange}></Input>
                    {errors['username'] ? <p className="errors_reg_log">{errors['username'].message}</p>: ''}             
                </FormGroup>

                <FormGroup>
                    <Label>Email:</Label>
                    <Input name='email'  onChange={handleChange}></Input>
                    {errors['email'] ? <p className="errors_reg_log">{errors['email'].message}</p>: ''}
                </FormGroup>
                <FormGroup>
                    <Label>Birthdate:</Label>
                    <Input  type="date" name='birthdate' onChange={handleChange}></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Password:</Label>
                    <Input  name='password' type='password' onChange={handleChange}></Input>
                    {errors['password'] ? <p className="errors_reg_log">{errors['password'].message}</p>: ''}
                    {
                    errors &&
                    <p className="errors_reg_log">{errors.errConfirmPassword}</p>
                    }
                </FormGroup>
                <FormGroup>
                    <Label>Confirm:</Label>                    
                    <Input type='password'  name='confirmPassword'  onChange={handleChange} />
                </FormGroup> 
                <Button type="submit" className="btn-register" onClick={enviarRegistro}>Register</Button>
                <div className="option" onClick={() => changeOption()}>Inicio de sesion</div>
            </Form>
        </div>
    );
};

export default Register;
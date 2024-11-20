import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { StateContext } from './contextProvider'
import axiosInstance from '../axiosInstance';

export default function RegisterForm() {
	const [formInputs, setRegisterForm] = useState({
        name: '',
        email: '',
        password: '',
    })
	const { tokenData, setTokenData } = useContext(StateContext)
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState({})

    const handleInput = (e) => {
        const { name, value } = e.target;
        setRegisterForm({ ...formInputs, [name]: value });
    }

    const storeRegisterForm = (e) => {
        e.preventDefault();
        const data = {
            email: formInputs.email,
            name: formInputs.name,
            password: formInputs.password,
        }
        axiosInstance.post('/register', data, {})
            .then(response => {
                if (response.data.status) {
                    localStorage.setItem('token', response.data.token)
                    setTokenData(response.data.token);
                }
                navigate('/');
            }).catch(function (error) {
                if (error.response) {

                    if (error.response.status === 401) {
                        setValidationError(error.response.data.errors)
                    }
                }
            });
    }
	
  return (
    <div>
        <div className="login-form">
		<div className="main-div">
			<div className="panel">
				<h2>Register</h2>
				<p>Please enter your email and password</p>
			</div>
			<form onSubmit={storeRegisterForm}>
				<div className="form-group">
					<input type="text" name="name" value={formInputs.name} onChange={handleInput} className="form-control" id="inputEmail"
						placeholder="Name"></input>
					<span className='text-danger'>{validationError.name}</span>
				</div>
				<div className="form-group">
					<input type="email" name="email" value={formInputs.email} onChange={handleInput} className="form-control" id="inputEmail"
						placeholder="Email Address"></input>
					<span className='text-danger'>{validationError.email}</span>
				</div>
				<div className="form-group">
					<input type="password" name="password" value={formInputs.password} onChange={handleInput} className="form-control"
						id="inputPassword" placeholder="Password"></input>
					<span className='text-danger'>{validationError.password}</span>
				</div>
				<div className="forgot">
					
				</div>
				<button type="submit"  className="btn btn-primary">Submit</button>

			</form>
		</div>
		<p className="botto-text"> </p>
	</div>
    </div>
  )
}

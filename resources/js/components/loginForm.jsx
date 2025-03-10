import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { StateContext } from './contextProvider'
import axiosInstance from '../axiosInstance';

export default function LoginForm() {
    const [formInputs, setForm] = useState({
        email: '',
        password: '',
    })
    const { tokenData, setTokenData } = useContext(StateContext)
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState({})

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm({ ...formInputs, [name]: value });
    }
    const saveLoginFormData = (e) => {
        e.preventDefault();
        const data = {
            email: formInputs.email,
            password: formInputs.password,
        }
        axiosInstance.post('/login', data)
            .then(response => {
                if (response.data.status) {
                    localStorage.setItem('token', response.data.token)
                    setTokenData(response.data.token);
                }
                navigate('/');
            }).catch(function (error) {
                if (error.response) {

                    if (error.response.status === 400) {
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
                        <h2>Admin Login</h2>
                        <p>Please enter your email and password</p>
                    </div>
                    <form onSubmit={saveLoginFormData}>
                        <div className="form-group">
                            <input type="email" name="email" value={formInputs.email} onChange={handleInput} className="form-control"
                                placeholder="Email Address"></input>
                        </div>

                        <div className="form-group">
                            <input type="password" name="password" value={formInputs.password} onChange={handleInput} className="form-control"
                                id="inputPassword" placeholder="Password"></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>

                    </form>
                </div>
                <p className="botto-text"> </p>
            </div>
        </div>
    )
}

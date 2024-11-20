import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInstance';

export default function Create() {
    const [formInputs, setForm] = useState({
        product_name: '',
        product_details: '',
        quantity: '',
        product_image: null,
    })
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState({})
    const handleInput = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setForm({ ...formInputs, [name]: files[0] });
        } else {
            setForm({ ...formInputs, [name]: value });
        }
    }
    const saveFormData = (e) => {
        e.preventDefault();
        const data = {
            product_name: formInputs.product_name,
            product_details: formInputs.product_details,
            quantity: formInputs.quantity,
            product_image: formInputs.product_image,
        }
        axiosInstance.post('products', data)
            .then(response => {
                navigate('/');
            }).catch(function (error) {
                if (error.response) {

                    if (error.response.status === 400) {
                        setValidationError(error.response.data.data)
                    }
                }
            });
    }
    return (
        <div className="col-md-8 content">
            <div className="col-md-10">
                <div className="panel panel-default">
                    <div className="panel-heading ">
                        Add Product
                    </div>
                    <form onSubmit={saveFormData} >
                        <div className="panel-body">
                            <div className="form-group col-md-10 ">
                                <label>Product Name:</label>
                                <input type="text" name="product_name"
                                    value={formInputs.product_name} onChange={handleInput} className="form-control" ></input>
                                <span className='text-danger'>{validationError.product_name}</span>
                            </div>
                            <div className="form-group col-md-10 ">
                                <label>Product Details:</label>
                                <input type="text" name="product_details"
                                    value={formInputs.product_details} onChange={handleInput} className="form-control" ></input>
                                <span className='text-danger'>{validationError.product_details}</span>
                            </div>
                            <div className="form-group col-md-10 ">
                                <label>Product Quantity:</label>
                                <input type="text" name="quantity"
                                    value={formInputs.quantity} onChange={handleInput} className="form-control" ></input>
                                <span className='text-danger'>{validationError.quantity}</span>
                            </div>

                            <div className="form-group col-md-10 ">
                                <label>Product Image:</label>
                                <input type="file" name="product_image" accept="image/*" multiple={false} onChange={handleInput} className="form-control" ></input>
                                <span className='text-danger'>{validationError.product_image}</span>
                            </div>
                            <div className="form-group col-md-10 ">
                                <button className="btn btn-success submit-btn" type="input"> Cancel</button>
                                <button className="btn btn-primary submit-btn" type="submit"> Submit</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

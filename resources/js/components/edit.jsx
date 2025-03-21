import axiosInstance from '../axiosInstance';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

export default function Edit() {
    const { id } = useParams();
    const [product, setProduct] = useState({
        product_name: '',
        product_details: '',
        quantity: '',
        product_image: null,
    })
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState({})

    useEffect(() => {
        if (id) {
            axiosInstance.get(`products/${id}`).then(response => {
                setProduct(response.data.data)
            })
        }
    }, [id]);

    const handleInput = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setProduct({ ...product, [name]: files[0] });
        } else {
            setProduct({ ...product, [name]: value });
        }
    }

    const updateFormData = (e) => {
        e.preventDefault();
        const data = {
            product_name: product.product_name,
            product_details: product.product_details,
            quantity: product.quantity,
            product_image: product.product_image,
            _method: 'PUT'
        }
        axiosInstance.post(`http://localhost:8000/api/products/${id}`, data)
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
                        Edit Product
                    </div>
                    <form onSubmit={updateFormData} >
                        <div className="panel-body">
                            <div className="form-group col-md-10 ">
                                <label>Product Name:</label>
                                <input type="text" name="product_name"
                                    value={product.product_name} onChange={handleInput} className="form-control" ></input>
                                <span className='text-danger'>{validationError.product_name}</span>
                            </div>
                            <div className="form-group col-md-10 ">
                                <label>Product Details:</label>
                                <input type="text" name="product_details"
                                    value={product.product_details} onChange={handleInput} className="form-control" ></input>
                                <span className='text-danger'>{validationError.product_details}</span>
                            </div>
                            <div className="form-group col-md-10 ">
                                <label>Product Quantity:</label>
                                <input type="text" name="quantity"
                                    value={product.quantity} onChange={handleInput} className="form-control" ></input>
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

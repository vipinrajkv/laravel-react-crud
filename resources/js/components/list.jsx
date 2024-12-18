import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function List() {
    const[products,setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:8000/api/products').then(response =>{
            setProducts(response.data.data)
        })
    },[]);

    const removeProduct = (e, id) => {
        e.preventDefault();
        const deleteRow = e.currentTarget;
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(response => {
                // navigate('product/create');
                deleteRow.closest("tr").remove();
            }).catch(function (error) {
                if (error.response) {
                }

            });
    }
  
   const productList = products.map((item,index)=>{
        return (
            <tr key={index}>
            <td>{item.id}</td>
            <td>{item.product_name}</td>
            <td>{item.product_details}</td>
            <td>{item.quantity}</td>
            <td>
                <img className="product-image" src={`images/products/${item.product_image}`} alt=""></img>
            </td>
            <td className="text-left">
                <Link to={`products/${item.id}/edit`} className='btn btn-info btn-xs'><span
                    className="glyphicon glyphicon-edit"></span> Edit
                </Link> 
                    <a href=""
                className="btn btn-danger btn-xs" onClick={(e)=> removeProduct(e,item.id)} ><span className="glyphicon glyphicon-remove"></span>
            Del</a></td>
            </tr>

        )
    });
  return (
    <div class="col-md-8">
    <h1>Products List</h1>  
    <div class="text-right" >
        <Link to="/product/create" class="btn btn-info  btn-sm float-right add-product" role="button">Add Product</Link>
    </div>
    <div class="panell">
        <div class="panell-body table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productList}
                </tbody>
            </table>
        </div>
    </div>
    </div>
  )
}

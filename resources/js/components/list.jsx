import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInstance';
export default function List() {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 5;
    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get('products', {
                params: {
                    perPage: perPage,
                    page: currentPage
                }
            })
            setProducts(response.data.data.data);
            const paginateData = response.data.data.meta;
            setTotalProducts(paginateData.total);
        } catch (error) {
            console.log(error);
        }
    }

    const totalPages = Math.ceil(totalProducts / perPage);
    const pageNumber = Array.from({ length: totalPages }, (_, i) => i + 1)
    const navigate = useNavigate();
    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const handlePagePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handlePageNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePageNumber = (page) => {
        setCurrentPage(page);
    }

    const removeProduct = (e, id) => {
        e.preventDefault();
        const deleteRow = e.currentTarget;
        axiosInstance.delete(`products/${id}`)
            .then(response => {
                deleteRow.closest("tr").remove();
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                }
            });
    }

    const productList = products.map((item, index) => {
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
                        className="btn btn-danger btn-xs" onClick={(e) => removeProduct(e, item.id)} ><span className="glyphicon glyphicon-remove"></span>
                        Del</a></td>
            </tr>
        )
    });
    return (
        <div className="col-md-8">
            <h1>Products List</h1>
            <div className="text-right" >
                <Link to="/product/create" className="btn btn-info  btn-sm float-right add-product" role="button">Add Product</Link>
            </div>
            <div className="panell">
                <div className="panell-body table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productList}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="container">
                <ul className="pagination">
                    <li disabled={currentPage === 1} >
                        <a onClick={() => handlePagePrevious(currentPage - 1)}>«</a>
                    </li>
                    {
                        pageNumber.map((pageNum) => (
                            <li key={pageNum} className={currentPage === pageNum ? 'active' : ''}>
                                <a onClick={() => handlePageNumber(pageNum)}>{pageNum}</a></li>
                        ))
                    }
                    <li><a onClick={() => handlePageNext()}>»</a></li>
                </ul>
            </div>
        </div>
    )
}

import React, { useContext, useEffect } from 'react'
import { useStateContext } from './contextProvider'
import {Navigate, Outlet, useNavigate } from 'react-router-dom'
import { StateContext } from './contextProvider'
import axiosInstance from '../axiosInstance'

export default function UserHeader() {
	const {tokenData, setTokenData, setUser, user} = useContext(StateContext)
	const navigate = useNavigate();
	useEffect(() => {
    }, [tokenData]);

	if(!tokenData) {
		return <Navigate to='/login'/>
	}

	const userLogOut = (e) => {
        e.preventDefault();
		axiosInstance.get('/logout').then(()=>{
			setTokenData(null);
			localStorage.removeItem('token');
			navigate('/login');
		})
    }

	useEffect(()=> {
		axiosInstance.get('/user').then(response =>{	
			setUser(response.data);
		})
    },[setUser]);
  return (
	<>
	<nav className="navbar navbar-default navbar-static-top">
	<div className="container-fluid">
		<div className="navbar-header">
			<button type="button" className="navbar-toggle navbar-toggle-sidebar collapsed">
				MENU
			</button>
			<button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
				data-target="#bs-example-navbar-collapse-1">
				<span className="sr-only">Toggle navigation</span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
			</button>
			<a className="navbar-brand" href="#">
				Laravel React Crud 
			</a>
		</div>

		<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<ul className="nav navbar-nav navbar-right">
				<li><a href="http://www.pingpong-labs.com" target="_blank">Hi, {user?.name ? `${user.name.charAt(0).toUpperCase()}${user.name.slice(1)}` : "User"}</a></li>
				<li className="dropdown ">
					<a href="#" className="dropdown-toggle" onClick={userLogOut} data-toggle="dropdown" role="button" aria-expanded="false">
						Logout
					</a>
				</li>
			</ul>
		</div>
	</div>
	</nav>
	<div className="container-fluid main-container"/>
	<Outlet/>
	</>
  )
}

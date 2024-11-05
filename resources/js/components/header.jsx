import React, { useContext, useState } from 'react'
import { useStateContext } from './contextProvider'
import {Link, Navigate, Outlet } from 'react-router-dom'

export default function DefaultHeader() {
	const {tokenData, setTokenData} = useStateContext();
	if(tokenData) {
		return <Navigate to='/'/>
	}
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
				React Crud
			</a>
		</div>

		<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<ul className="nav navbar-nav navbar-right">
				<li><Link to="/login">Login</Link></li>
				<li><Link to="/register">Register</Link></li>
				
			</ul>
		</div>
	</div>
	</nav>
	<div className="container-fluid main-container"/>
	<Outlet/>
	</>
  )
}

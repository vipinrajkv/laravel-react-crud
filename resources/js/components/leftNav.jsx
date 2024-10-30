import React from 'react'
import { Link } from 'react-router-dom'
export default function LeftNav() {
  return (
    <div className="col-md-2 sidebar">
			<div className="row">
				<div className="absolute-wrapper"> </div>
				<div className="side-menu">
					<nav className="navbar navbar-default" role="navigation">
						<div className="side-menu-container">
							<ul className="nav navbar-nav">
								<li className="active">
									<a href="#"><span className="glyphicon glyphicon-dashboard"></span>
										Product</a>
								</li>
								<li><Link to="/product/create"><span className="glyphicon glyphicon-list-alt"></span>Add Product</Link></li>
							</ul>
						</div>
					</nav>

				</div>
			</div>
		</div>
  )
}

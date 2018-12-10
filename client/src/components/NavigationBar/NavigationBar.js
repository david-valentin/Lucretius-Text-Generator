import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../style/NavigationBar.css";

class NavigationBar extends Component {
	constructor(props) {
		super(props);
		this.renderLoginLogoutNavs = this.renderLoginLogoutNavs.bind(this);
		this.renderCheckout = this.renderCheckout.bind(this);
		this.state = {
			isOpen: false,
		};
	}

	/**
	 * renderCheckout - Renders a link component for checkout if the user is logged in and has a cart available
	 *
	 * @return {Component} Link to checkout
	 */
	renderCheckout() {
		return ( null )
	}


	/**
	 * renderLoginLogoutNavs - Renders a link component for logout if the user is logged in
	 *
	 * @return {Component}  Link to checkout
	 */
	renderLoginLogoutNavs() {
		let	userSessionButtons = [
				<li key="usersignup" className="right-nav"><Link className="NavigationLink" to='/generate-text'>Generate Text</Link></li>,
				<li key="login" className="right-nav"><Link className="NavigationLink" to='/classify-text'>Classify Text</Link></li>
			];
		return (userSessionButtons);
	}

	render() {

		return (
			<div className="NavigationDiv">
				<ul className="NavigationUl">
					{this.renderLoginLogoutNavs()}
					{this.renderCheckout()}
					<li><Link className="NavigationLink" to='/'>Roman Philosophy</Link></li>
					<li className="right-nav"><Link className="NavigationLink" to='/about'>About</Link></li>
				</ul>
			</div>
		);
	}
}

export default NavigationBar;

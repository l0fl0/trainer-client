import React, { Component } from "react";
import { API_URL } from "../App";
import axios from "axios";

export default class AuthButton extends Component {
	state = {
		user: null,
		isAuthenticated: false,
	};

	componentDidMount() {
		// Check auth
		axios
			.get(`${API_URL}/profile`, { withCredentials: true })
			.then((res) => {
				this.setState({
					user: res.data,
					isAuthenticated: true,
				});
			})
			.catch(() => {
				this.setState({
					isAuthenticated: false,
				});
			});
	}

	signOut = () => {
		// Change location to /logout server route while passing it
		// the URL for redirecting back to a client
		const url = `${window.location.protocol}//${window.location.host}`;
		// from=${url}
		window.location = `${API_URL}/auth/logout`;
	};

	render() {
		const { user, isAuthenticated } = this.state;

		return (
			isAuthenticated && (
				<p>
					<img height="25" src={user.image} alt={user.displayName} />
					<button onClick={this.signOut}>Sign out</button>
				</p>
			)
		);
	}
}

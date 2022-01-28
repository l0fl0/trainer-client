import React, { Component } from "react";
import { API_URL } from "../App";
import axios from "axios";
import Buttons from "./Buttons/Buttons";

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

		window.location = `${API_URL}/auth/logout?from=${url}`;
	};

	render() {
		const { user, isAuthenticated } = this.state;

		return (
			isAuthenticated && (
				<div>
					<div height="25">
						<img src={user.image} alt={user.displayName} />
					</div>
					<Buttons text="Sign out" onClick={this.signOut} />
				</div>
			)
		);
	}
}

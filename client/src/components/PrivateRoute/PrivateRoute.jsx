import "./PrivateRoute.scss";

import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

import { API_URL } from "../../App";
import BottomNav from "../BottomNav/BottomNav";

export default class PrivateRoute extends Component {
	state = {
		isAuthenticating: true,
		isAuthenticated: false,
		user: null,
	};

	componentDidMount() {
		axios
			.get(`${API_URL}/profile`, { withCredentials: true })
			.then((res) => {
				this.setState({
					user: res.data,
					isAuthenticating: false,
					isAuthenticated: true,
				});
			})
			.catch(() => {
				this.setState({
					isAuthenticating: false,
					isAuthenticated: false,
				});
			});
	}

	render() {
		const { component: Component, ...rest } = this.props;
		// Return a Route with all original props passed to it
		// and a custom render prop that waits for component to
		// finish authenticating and for successful auth
		// render component and also pass user object provided by server as a prop
		// otherwise redirect back to login page while pasing it
		// a current route so it can redirect back to page you came from
		return (
			<Route
				{...rest}
				render={(props) => {
					// While authenticating, don't show anything
					if (this.state.isAuthenticating) return <h1>Loading...</h1>;

					return this.state.isAuthenticated ? (
						<>
							<div className="page">
								<Component user={this.state.user} {...props} />
							</div>
							<BottomNav userId={this.state.user._id} {...props} />
						</>
					) : (
						<Redirect
							to={{
								pathname: "/login",
								state: { from: props.location },
							}}
						/>
					);
				}}
			></Route>
		);
	}
}

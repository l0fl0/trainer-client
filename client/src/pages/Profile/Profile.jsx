import "./Profile.css";
import React from "react";
import { API_URL } from "../../App";
import axios from "axios";
export default function Profile({ user }) {
	const getStrava = async () => {
		let response = await axios.get("http://localhost:8080/auth/strava", {
			withCredentials: true,
		});
		console.log(response);
	};
	const loginStrava = (e) => {
		e.preventDefault();
		window.location = `${API_URL}/auth/strava`;
	};
	return (
		<div>
			<h1>Welcome {user.displayName}</h1>
			<button onClick={loginStrava} className="login-card__google-auth-btn">
				<i className="fab fa-strava login-card__google-icon"></i>
				Connect To Strava
			</button>
		</div>
	);
}

//? Authorize client to access strava data
// http://www.strava.com/oauth/authorize?client_id=76994&response_type=code&redirect_uri=http://localhost:3000/profile.com/exchange_token&approval_prompt=force&scope=activity:read_all
//? Authorization code
// a68409ffc1e4cb4d77cd5ecb8c27e1189602501f

// https://www.strava.com/oauth/token?client_id=76994&client_secret=1d641c88e897058719a76484879a7d31681212ff&code=a68409ffc1e4cb4d77cd5ecb8c27e1189602501f&grant_type=authorization_code

//? refresh token
// b3ff611252c97810cd172c39c61e757159e9a33f
//? Access token
// b0118a02b16f55eb1683c8d42d92cbb33a6c2415

//? get all activities
// https://www.strava.com/api/v3/athlete/activities?access_token=b0118a02b16f55eb1683c8d42d92cbb33a6c2415

//? get new access token
// https://www.strava.com/oauth/token?client_id=76994&client_secret=1d641c88e897058719a76484879a7d31681212ff&refresh_token=b3ff611252c97810cd172c39c61e757159e9a33f&grant_type=refresh_token

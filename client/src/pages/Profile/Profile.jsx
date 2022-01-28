import "./Profile.css";
import React from "react";

import Buttons from "../../components/Buttons/Buttons";
import Input from "../../components/Input/Input";
export default function Profile({ user }) {
	const loginStrava = (e) => {
		e.preventDefault();
		const redirect_uri = "http://localhost:8080/auth/strava";
		const scope = "activity:read_all,activity:write";

		window.location = `http://www.strava.com/oauth/authorize?client_id=76994&response_type=code&redirect_uri=${redirect_uri}&approval_prompt=force&scope=${scope}`;
	};

	user.title = "Trainer";
	user.certified = true;
	return (
		<div>
			<h1>Welcome {user.firstName || ""}</h1>
			<header>
				<img src={user.image} alt="" />
				<div>
					<h2>{user.displayName}</h2>
					{user.certified ? <h3>{user.title}</h3> : null}
				</div>
			</header>
		</div>
	);
}

/* EDIT PROFILE PAGE
	const settings = [
		"sign out",
		user.firstName,
		"Billing & Plans",
		"Notifications",
		"Password",
		"Orginizations",
		"Socials",
		"location",
	];
<h1>Public Profile</h1>
<img src={user.image} alt={user.displayName + "profile picture"} />
<Input label="Name" />
<label htmlFor="userBio"></label>
<textarea
	name="userBio"
	placeholder="Share a little about youself and increase your visability."
></textarea>
<Buttons
	text="Connect To Strava"
	iconLeft="fab fa-strava "
	onClick={loginStrava}
/>
*/
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

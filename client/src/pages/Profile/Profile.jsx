import "./Profile.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Buttons from "../../components/Buttons/Buttons";
// import Input from "../../components/Input/Input";
import nasmLogo from "../../assets/images/nasm-logo.jpg";
import cprLogo from "../../assets/images/cpr-aed-cert.jpg";
import { API_URL } from "../../App";
import ActivityCard from "../../components/ActivityCard/ActivityCard";
import LoadingAnimation from "../../components/LoadingAnnimation/LoadingAnimation";

export default function Profile({ user, ...rest }) {
	const [stravaProfile, setStravaProfile] = useState(null);
	const [stravaActivities, setStravaActivities] = useState(null);
	const [trainer, setTrainer] = useState(null);
	const [load, setLoad] = useState(true);
	const [userInfo, setUserInfo] = useState(null);
	let access_token = "";

	useEffect(() => {
		if (rest.match.path === "/edit-profile/:id") {
			setUserInfo(user);
			console.log(userInfo);
		}

		if (rest.match.path === "/profile/:id") {
			console.log("hello");
			axios
				.get(`${API_URL}/profile/${rest.match.params.id}`)
				.then((res) => setUserInfo(res));
			console.log(userInfo);
		}
		// Get trainer info
		if (user.certified) {
			axios
				.get(`${API_URL}/trainer/${user._id}`, {
					withCredentials: true,
				})
				.then((res) => {
					setTrainer(res.data);
				});
		}

		// Get strava profile and Athlete activities
		if (user.stravaConnected) {
			axios
				.get(`${API_URL}/stravaaccount`, {
					withCredentials: true,
				})
				.then((res) => {
					access_token = res.data.access_token;
					setStravaProfile(res.data.profileData);
				})
				.then(() => {
					getActivities();
				});
		}
		setTimeout(() => {
			setLoad(false);
		}, 1000);
	}, []);

	const getActivities = () => {
		axios
			.get(
				`https://www.strava.com/api/v3/athlete/activities?per_page=5&access_token=${access_token}`
			)
			.then((res) => {
				setStravaActivities(res.data);
				setLoad(false);
			})
			.catch((err) => {
				// get new access
				axios
					.get(`${API_URL}/stravaaccount/refresh/${rest.match.params.id}`)
					.then((res) => {
						access_token = res.data.access_token;
						getActivities();
						setLoad(true);
					})
					.catch((err) => {
						console.log(err);
					});
			});
	};

	const loginStrava = (e) => {
		e.preventDefault();
		const AUTH_API =
			"http://www.strava.com/oauth/authorize?client_id=76994&response_type=code";
		const redirect_uri = "http://localhost:8080/auth/strava";
		const scope = "activity:read_all,activity:write";

		window.location = `${AUTH_API}&redirect_uri=${redirect_uri}&approval_prompt=force&scope=${scope}`;
	};

	const signOut = () => {
		const url = `${window.location.protocol}//${window.location.host}`;
		window.location = `${API_URL}/auth/logout?from=${url}`;
	};

	if (load) {
		return <LoadingAnimation />;
	}
	return (
		<main className="profile">
			<header className="profile__header">
				<img
					src={user.image}
					alt={`${user.firstName}'s profile picture`}
					className={`profile__header-image ${
						user.certified ? "profile__header-image--trainer" : ""
					}`}
				/>
				<div>
					<h1 className="profile__header-name">{user.displayName}</h1>
					{trainer ? (
						<h3 className="profile__header-title">{trainer.title}</h3>
					) : null}
				</div>
				{rest.match.path === "/edit-profile/:id" ? null : (
					<Buttons text="connect" className="profile__connect" />
				)}
			</header>

			<section className="profile__connection-stats">
				<i className="fas fa-user-friends"></i>
				{trainer ? (
					<p className="profile__connection-stat">
						<span className="profile__connection-quantity">2</span> active
						clients
					</p>
				) : null}
				<p className="profile__connection-stat">
					<span className="profile__connection-quantity">20</span> active
					connections
				</p>
			</section>

			{trainer ? (
				<ul className="profile__certification-list">
					Certifications / Trainings
					{trainer.certifications.map((cert) => {
						return (
							// ToDo: Make into component
							<li className="profile__certification" key={cert.name}>
								<img
									src={cert.name === "CPR/AED" ? cprLogo : nasmLogo}
									alt="cert logos"
									className="profile__certification-image"
								/>

								<a
									href="https://www.redcross.org/take-a-class/digital-certificate"
									// to={`certs/${user.name}/${cert.name}`}
									className="profile__certification-link"
								>
									{cert.name}
								</a>

								<span className="profile__certification-org">
									{cert.organization}
								</span>
							</li>
						);
					})}
				</ul>
			) : null}

			<p className="profile__bio">{user.bio}</p>

			<section className="profile__socials">
				<div className="profile__link-card">
					<i className="far fa-envelope profile__link-icon"></i>
					<a
						className="profile__link"
						href={`mailto:${user.email}?subject=Hi Lets get Training.`}
						title={`Send ${user.firstName} an E-mail`}
					>
						{user.email}
					</a>
				</div>
				{stravaProfile ? (
					<div className="profile__link-card">
						<i className="fab fa-strava profile__link-icon"></i>
						<a
							className="profile__link"
							href={`https://www.strava.com/athletes/${stravaProfile.id}`}
							target="_blank"
							rel="noopener noreferrer"
							title={`Checkout ${user.firstName}'s Strava Account`}
						>
							Checkout {user.firstName}'s Strava Account
						</a>
					</div>
				) : null}
				{user.linkedin ? (
					<div className="profile__link-card">
						<i className="fab fa-linkedin profile__link-icon"></i>
						<a
							className="profile__link"
							href={user.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							title={`Open ${user.firstName}'s LinkedIn profile`}
						>
							<span>Open {user.firstName}'s LinkedIn profile</span>
						</a>
					</div>
				) : null}
			</section>
			{rest.match.path === "/edit-profile/:id" ? (
				<Link to={`/edit-profile/${user._id}`}>
					<Buttons text="Edit profile" className="profile__edit-btn" />
				</Link>
			) : null}

			{!stravaProfile ? (
				<>
					<h3>Send your metrics to strava for safe keeping!</h3>
					<h4>Gain a bunch of new features with better activity traking.</h4>
					<Buttons
						className="profile__strava-connect"
						text="Connect To Strava"
						iconLeft="fab fa-strava"
						onClick={loginStrava}
					/>
				</>
			) : (
				<section>
					<ul className="profile__activities">
						<h2 className="profile__activities-title">
							Most Recent Activities
						</h2>
						{stravaActivities
							? stravaActivities.map((activity) => (
									<ActivityCard key={activity.id} activity={activity} />
							  ))
							: null}
					</ul>
				</section>
			)}
			{rest.match.path === "/edit-profile/:id" ? (
				<Buttons text="Sign out" onClick={signOut} />
			) : null}
		</main>
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

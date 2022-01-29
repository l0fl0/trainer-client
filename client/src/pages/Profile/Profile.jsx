import "./Profile.scss";
import React from "react";
import { Link } from "react-router-dom";

import Buttons from "../../components/Buttons/Buttons";
// import Input from "../../components/Input/Input";
import nasmLogo from "../../assets/images/nasm-logo.jpg";
import cprLogo from "../../assets/images/cpr-aed-cert.jpg";
export default function Profile({ user }) {
	const loginStrava = (e) => {
		e.preventDefault();
		const redirect_uri = "http://localhost:8080/auth/strava";
		const scope = "activity:read_all,activity:write";

		window.location = `http://www.strava.com/oauth/authorize?client_id=76994&response_type=code&redirect_uri=${redirect_uri}&approval_prompt=force&scope=${scope}`;
	};

	user.title = "Yoga and Wellness Instructor";
	user.certified = true;
	user.bio =
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum totam illo ad voluptatum repudiandae id aliquam.";

	user.certifications = [
		{
			name: "CPR/AED",
			organization: "American Red Cross",
			since: "02/2019",
			expiry: "03/22",
		},
		{
			name: "Certified Personal Trainer",
			organization: "NASM",
			since: "01/2022",
			expiry: "01/24",
		},
	];
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
					<h2 className="profile__header-name">{user.displayName}</h2>
					{user.certified ? (
						<h3 className="profile__header-title">{user.title}</h3>
					) : null}
				</div>
			</header>

			{user.certified ? (
				<ul className="profile__certification-list">
					Certifications / Trainings
					{user.certifications.map((cert) => {
						return (
							// ToDo: Make into component
							<li className="profile__certification">
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
				{user.athleteId ? (
					<div className="profile__link-card">
						<i className="fab fa-strava profile__link-icon"></i>
						<a
							className="profile__link"
							href={`https://www.strava.com/athletes/${user.athleteId}`}
							target="_blank"
							rel="noopener noreferrer"
							title={`Checkout ${user.firstName}'s Strava Account`}
						>
							Checkout {user.firstName}'s Strava Account
						</a>
					</div>
				) : (
					""
				)}
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
				) : (
					""
				)}
			</section>
			<Link to={`/edit-profile/${user._id}`}>
				<Buttons text="Edit profile" />
			</Link>
			<Buttons
				className="profile__strava-connect"
				text="Connect To Strava"
				iconLeft="fab fa-strava "
				onClick={loginStrava}
			/>
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

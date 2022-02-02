import React from "react";
import { Link } from "react-router-dom";
import Buttons from "../../components/Buttons/Buttons";
import Input from "../../components/Input/Input";
import tcLogo from "../../assets/images/tc-logo.png";
export default function Signup() {
	return (
		<main>
			<header className="login__heading">
				<img src={tcLogo} alt="trainer client logo" className="login__logo" />
				<h1 className="login__title">Sign up for TrainerClient</h1>
			</header>
			<form className="login__form">
				<div className="login__field-container">
					<Input
						className="login__input"
						name="loginName"
						type="text"
						label="Name"
					/>
				</div>

				<div className="login__field-container">
					<Input
						className="login__input"
						type="email"
						name="loginEmail"
						label="Email address"
					/>
				</div>

				<div className="login__field-container">
					<Input
						className="login__input"
						name="loginPassword"
						type="text"
						label="Phone Number (optional)"
					/>
				</div>

				<div className="login__field-container">
					<Input
						className="login__input"
						name="loginPassword"
						type="password"
						label="Password"
					/>
				</div>

				<div className="login__field-container">
					<Input
						className="login__input"
						name="loginPassword"
						type="password"
						label="Confirm Password"
					/>
				</div>

				<Buttons text="Sign Up" />
			</form>
			<br />
			<Link to="/login">
				<Buttons text="Back to login" />
			</Link>
		</main>
	);
}

import "./Login.scss";
import { API_URL } from "../../App";
import Buttons from "../../components/Buttons/Buttons";
import googleIcon from "../../assets/images/google-icon.png";
import Input from "../../components/Input/Input";
import tcLogo from "../../assets/images/tc-logo.png";
import { Link } from "react-router-dom";

export default function LoginPage(props) {
	const loginGoogle = (e) => {
		e.preventDefault();
		const { from } = props.location.state || { from: { pathname: "/" } };

		window.location = `${API_URL}/auth/google`;
	};

	return (
		<main className="login">
			<header className="login__heading">
				<img src={tcLogo} alt="trainer client logo" className="login__logo" />
				<h1 className="login__title">Sign in to TrainerClient</h1>
			</header>

			<form className="login__form">
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
						type="password"
						label="Password"
					/>
				</div>

				<Buttons text="Sign in" />

				<Buttons
					text="Sign in with Google"
					className="login__google-auth-btn"
					onClick={loginGoogle}
					imgLeft={googleIcon}
				/>
			</form>

			<footer className="login__signup-card">
				New to TrainerClient ?
				<Link to="/signup" className="login__signup-link">
					Create an account
				</Link>
				.
			</footer>
		</main>
	);
}

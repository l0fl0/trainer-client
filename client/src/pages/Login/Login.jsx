import "./Login.css";
import { Link } from "react-router-dom";
import { API_URL } from "../../App";

function LoginPage(props) {
	const login = (e) => {
		e.preventDefault();
		const { from } = props.location.state || { from: { pathname: "/" } };

		const url = `${window.location.protocol}//${window.location.host}${from.pathname}`;

		window.location = `${API_URL}/auth/google`;
	};

	return (
		<div className="login-card">
			<h1>Login</h1>
			<form className="login-card__form">
				<div className="login-card__field-container">
					<label htmlFor="loginEmail">
						Email
						<input
							className="login-card__input"
							type="email"
							name="loginEmail"
							id="loginEmail"
						/>
					</label>
				</div>
				<div className="login-card__field-container">
					<label htmlFor="loginPassword">
						Password
						<input
							className="login-card__input"
							type="password"
							name="loginPassword"
							id="loginPassowrd"
						/>
					</label>
				</div>
				<Link to="/" className="login-card__login-btn">
					Log In
				</Link>
				<button onClick={login} className="login-card__google-auth-btn">
					<i className="fab fa-google login-card__google-icon"></i>
					Log In With Google
				</button>
			</form>
		</div>
	);
}

export default LoginPage;

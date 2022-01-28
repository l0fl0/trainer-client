import "./Login.scss";
import { API_URL } from "../../App";
import Buttons from "../../components/Buttons/Buttons";
import googleIcon from "../../assets/images/google-icon.png";

export default function LoginPage(props) {
	const loginGoogle = (e) => {
		e.preventDefault();
		const { from } = props.location.state || { from: { pathname: "/" } };

		window.location = `${API_URL}/auth/google`;
	};

	return (
		<div className="login-card">
			<form className="login-card__form">
				<div className="login-card__field-container">
					<label htmlFor="loginEmail">
						Email Address
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

				<Buttons text="Log in" />
				<Buttons
					text="Sign in with Google"
					className="login-card__google-auth-btn"
					onClick={loginGoogle}
					imgLeft={googleIcon}
				/>
			</form>
		</div>
	);
}

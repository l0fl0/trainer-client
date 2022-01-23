import "./App.css";
import LoginPage from "./pages/Login/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute";
import AuthButton from "./components/AuthButton";
export const API_URL = "http://localhost:8080";

function App() {
	return (
		<BrowserRouter>
			<AuthButton />
			<div className="parent">
				<Switch>
					<Route path="/login" component={LoginPage} />
					<PrivateRoute path="/profile" component={Profile} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;

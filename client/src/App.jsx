import "./App.scss";
import LoginPage from "./pages/Login/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Signup from "./pages/Signup/Signup";
import Clients from "./pages/Clients/Clients";
import TopNav from "./components/TopNav/TopNav";
import ProgramBuilder from "./pages/ProgramBuilder/ProgramBuilder";
import Trainers from "./pages/Trainers/Trainers";
import Map from "./pages/Map/Map";
export const API_URL = "http://localhost:8080";

function App() {
	return (
		<BrowserRouter>
			{/* <TopNav /> */}
			<div className="center">
				<Switch>
					<Route exact path="/" component={LoginPage} />
					<Route path="/login" component={LoginPage} />
					<Route path="/signup" component={Signup} />
				</Switch>
			</div>
			<Switch>
				<Route path="/profile/:id" component={Profile} />
				<PrivateRoute path="/edit-profile/:id" component={Profile} />
				<PrivateRoute path="/clients/:id" component={Clients} />
				<PrivateRoute path="/trainers" component={Clients} />
				<PrivateRoute path="/program-builder/:id" component={ProgramBuilder} />
				<PrivateRoute path="/programs/:id" component={ProgramBuilder} />
				<PrivateRoute path="/map" component={Map} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;

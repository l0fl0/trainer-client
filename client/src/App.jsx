import "./App.scss";
import LoginPage from "./pages/Login/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./pages/Signup/Signup";
import TopNav from "./components/TopNav/TopNav";
import BottomNav from "./components/BottomNav/BottomNav";
export const API_URL = "http://localhost:8080";

function App() {
	return (
		<BrowserRouter>
			{/* <TopNav /> */}
			<div className="center">
				<Switch>
					<Route path="/login" component={LoginPage} />
					<Route path="/signup" component={Signup} />
				</Switch>
			</div>
			<div className="pages">
				<Switch>
					<PrivateRoute path="/profile" component={Profile} />
				</Switch>
			</div>
			<BottomNav />
		</BrowserRouter>
	);
}

export default App;

import "./BottomNav.scss";
import { NavLink } from "react-router-dom";
export default function BottomNav() {
	return (
		<nav className="nav">
			<NavLink
				to="/clients"
				className="nav__item"
				activeClassName="nav__item--active"
			>
				<i className="fas fa-user-friends"></i>
			</NavLink>
			<NavLink
				to="/program-builder"
				className="nav__item"
				activeClassName="nav__item--active"
			>
				<i className="fas fa-clipboard"></i>
			</NavLink>
			<NavLink
				to="/scheduler"
				className="nav__item"
				activeClassName="nav__item--active"
			>
				<i className="fas fa-calendar-day"></i>
			</NavLink>
			<NavLink
				to="/profile"
				className="nav__item"
				activeClassName="nav__item--active"
			>
				<i className="fas fa-user"></i>
			</NavLink>
		</nav>
	);
}

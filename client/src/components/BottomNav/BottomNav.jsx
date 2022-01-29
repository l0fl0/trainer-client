import "./BottomNav.scss";
import { NavLink } from "react-router-dom";
export default function BottomNav({ userId }) {
	if (!userId) {
		return null;
	}
	return (
		<nav className="nav">
			<NavLink
				to={`/clients/${userId}`}
				className="nav__item"
				activeClassName="nav__item--active"
			>
				<i className="fas fa-user-friends"></i>
			</NavLink>
			<NavLink
				to={`/program-builder/${userId}`}
				className="nav__item"
				activeClassName="nav__item--active"
			>
				<i className="fas fa-clipboard"></i>
			</NavLink>
			<NavLink
				to={`/scheduler/${userId}`}
				className="nav__item"
				activeClassName="nav__item--active"
			>
				<i className="fas fa-calendar-day"></i>
			</NavLink>
			<NavLink
				to={`/profile/${userId}`}
				className="nav__item"
				activeClassName="nav__item--active"
			>
				<i className="fas fa-user"></i>
			</NavLink>
		</nav>
	);
}

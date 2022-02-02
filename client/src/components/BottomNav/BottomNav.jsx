import "./BottomNav.scss";
import { NavLink } from "react-router-dom";
export default function BottomNav({ userId, certified }) {
	if (!userId) {
		return null;
	}
	return (
		<nav className="nav">
			<NavLink
				to={certified ? `/clients/${userId}` : "/trainers"}
				className="nav__item"
				activeClassName="nav__item--active"
			>
				<i className="fas fa-users"></i>
			</NavLink>
			<NavLink
				to={certified ? `/program-builder/${userId}` : "/programs/:id"}
				className="nav__item"
				activeClassName="nav__item--active"
			>
				<i className="fas fa-clipboard"></i>
			</NavLink>
			{/* Sheduler */}
			{/* <NavLink
				to={`/scheduler/${userId}`}
				className="nav__item"
				activeClassName="nav__item--active"
			>
				<i className="fas fa-calendar-day"></i>
			</NavLink> */}
			<NavLink
				to={`/edit-profile/${userId}`}
				className="nav__item"
				activeClassName="nav__item--active"
			>
				<i className="fas fa-user"></i>
			</NavLink>
		</nav>
	);
}

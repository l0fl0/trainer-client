import "./BottomNav.scss";
export default function BottomNav() {
	return (
		<nav className="nav">
			<div className="nav__item">
				<i className="fas fa-user-friends"></i>
			</div>
			<div className="nav__item">
				<i className="far fa-clipboard"></i>
			</div>
			<div className="nav__item">
				<i className="fas fa-calendar-day"></i>
			</div>
			<div className="nav__item">
				<i className="fas fa-user"></i>
			</div>
		</nav>
	);
}

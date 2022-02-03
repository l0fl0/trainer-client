import "./ClientCard.scss";
import tcLogo from "../../assets/images/tc-logo.png";

export default function ClientCard({ name, id, phone, date }) {
	return (
		<li
			className="client__card"
			onClick={() => (window.location = `http://localhost:3000/profile/${id}`)}
		>
			<div className="client__info">
				<div className="client__info-profile">
					<img src={tcLogo} alt="" className="client__info-image" />
					<h2 className="client__info-title">{name}</h2>
				</div>
				<div>
					<h3 className="client__info-subtitle">Next session</h3>
					<p className="client__info-date">{date}</p>
				</div>
			</div>
			<ul className="client__icon-wrapper">
				<li className="client__icon-border">
					<i className="fas fa-comment client__icon"></i>
				</li>
				<li className="client__icon-border">
					<i className="fas fa-phone client__icon"></i>
				</li>
				<li className="client__icon-border">
					<i className="fas fa-dollar client__icon"></i>
				</li>
			</ul>
		</li>
	);
}

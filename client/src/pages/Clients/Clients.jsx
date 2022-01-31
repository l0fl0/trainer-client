import React from "react";
import "./Clients.scss";
export default function Clients() {
	// _id
	// :61e8be293edc738bdf4b76ff
	// name
	// :"Sofia Moreno"
	// email
	// :"sofia.moreno@mongodb.com"
	// phone
	// :"9542588335"
	// bio
	// :"lorem ipsum dolor sit amet. oreml sit dolor amet."
	// dob
	// :"1998/31/07"
	// programs
	// :
	// Array
	// rating
	// :0
	return (
		<ul className="client__list">
			<h1 className="client__list-title">Clients</h1>
			<li className="client__card">
				<div className="client__info">
					<h2 className="client__info-title">Louis Flores</h2>
					<div>
						<h3 className="client__info-subtitle">Next session</h3>
						<p>05:30pm, Friday, 02/04</p>
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
		</ul>
	);
}

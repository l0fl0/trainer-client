import React, { useEffect } from "react";
import "./Clients.scss";
import Buttons, { ActionButton } from "../../components/Buttons/Buttons";
import ClientCard from "../../components/ClientCard/ClientCard";
import { Modal } from "react-bootstrap";
import qrCode from "../../assets/images/frame.png";
import LoadingAnimation from "../../components/LoadingAnnimation/LoadingAnimation";
export default function Clients({ user }) {
	const clientList = [
		{ id: "61f50f1de87f2f1b497e3248", name: "Ivan Flores", phone: 9545448667 },
		{ id: "61e8be293edc738bdf4b76ff", name: "Sofia Moreno", phone: 9542588335 },
	];
	const trainerList = [
		{ id: "61f4dd19b2fa7584616430b6", name: "Louis Flores" },
	];
	const [modalShow, setModalShow] = React.useState(false);
	const [load, setLoad] = React.useState(true);
	const onHide = () => setModalShow(false);

	useEffect(() => {
		setTimeout(() => setLoad(false), 500);
	}, []);
	if (load) {
		return <LoadingAnimation />;
	}
	return (
		<main className="client">
			<header className="client__header">
				<h1 className="client__list-title">
					{user.certified ? "Clients" : "Trainers"}
				</h1>
				<ActionButton text="+" onClick={() => setModalShow(true)} />
				{/* https://www.qr-code-generator.com/qr-code-api/ */}
				{modalShow ? (
					<div className="modalback">
						<div className="modal">
							<h4>Scan QR code to be Connected</h4>
							<div>
								<h2>{user.displayName}</h2>
								<img src={qrCode} alt="user qr code" />
							</div>
							<div>
								<Buttons onClick={onHide} text="Close"></Buttons>
							</div>
						</div>
					</div>
				) : null}
			</header>
			<ul className="client__list">
				{user.certified
					? clientList.map((client) => (
							<ClientCard
								key={client.id}
								name={client.name}
								id={client.id}
								phone={client.phone}
							/>
					  ))
					: trainerList.map((client) => (
							<ClientCard key={client.id} name={client.name} user={user} />
					  ))}
			</ul>
		</main>
	);
}

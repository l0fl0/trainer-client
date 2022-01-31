import React from "react";
import "./Clients.scss";
import { ActionButton } from "../../components/Buttons/Buttons";
import ClientCard from "../../components/ClientCard/ClientCard";
export default function Clients() {
	const clientList = [
		"Ivan Flores",
		"Sofia Moreno",
		"Ivan Flores",
		"Sofia Moreno",
		"Ivan Flores",
		"Sofia Moreno",
	];
	return (
		<main className="client">
			<header className="client__header">
				<h1 className="client__list-title">Clients</h1>
				<ActionButton text="+" />
			</header>
			<ul className="client__list">
				{clientList.map((client) => (
					<ClientCard key={client.id} name={client} />
				))}
			</ul>
		</main>
	);
}

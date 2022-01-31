import React, { useCallback, useState, useRef } from "react";
import ReactFlow, { MiniMap, removeElements } from "react-flow-renderer";
import Buttons from "../Buttons/Buttons";
import FlowSidebar from "../FlowSidebar/FlowSidebar";
import FlowTemplate from "../FlowTemplate/FlowTemplate";
import "./Flow.scss";
// Library https://reactflow.dev/docs/
const element = [
	{
		id: "1",
		type: "input", // input node
		data: { label: "clientName" },
		position: { x: 100, y: 0 },
	},
	{
		id: "3",
		type: "output", // output node
		data: { label: "Clients desired goal" },
		position: { x: 500, y: 500 },
	},
];

export default function Flow() {
	const [elements, setElements] = useState(element);
	const yPos = useRef(0);

	const addNode = useCallback(() => {
		yPos.current += 50;
		setElements((elements) => {
			return [
				...elements,
				{
					id: Math.random(),
					position: { x: 100, y: yPos.current },
					sourcePosition: "right",
					targetPosition: "left",
					data: { label: <FlowTemplate /> },
				},
			];
		});
	}, []);

	const addEdge = useCallback(({ source, target }) => {
		setElements((elements) => {
			console.log(source, target);
			return [
				...elements,
				{
					id: Math.random(),
					source,
					target,
				},
			];
		});
	}, []);
	console.log(elements);

	return (
		<>
			<header className="rf__header">
				<h2 className="rf__title">Create Flow</h2>
				<Buttons text="send flow to client" className="rf__send-btn" />
			</header>
			<div className="rf__canvas">
				<div style={{ height: 700 }}>
					<ReactFlow elements={elements} onConnect={addEdge}>
						<MiniMap />
					</ReactFlow>
				</div>
			</div>
			<FlowSidebar />
			<button onClick={addNode}>Add</button>
		</>
	);
}

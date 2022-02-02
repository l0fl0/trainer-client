import React, { useCallback, useState, useRef, useEffect } from "react";
import ReactFlow, {
	removeElements,
	ReactFlowProvider,
	addEdge,
} from "react-flow-renderer";
import Buttons from "../Buttons/Buttons";
import FlowSidebar from "../FlowSidebar/FlowSidebar";
import FlowTemplate from "../FlowTemplate/FlowTemplate";
import LoadingAnimation from "../LoadingAnnimation/LoadingAnimation";
import "./Flow.scss";
// Library https://reactflow.dev/docs/
const Input = () => {
	return (
		<div suppressContentEditableWarning contentEditable>
			Client Info
		</div>
	);
};

const Output = () => {
	return (
		<div suppressContentEditableWarning contentEditable>
			Client Goal
		</div>
	);
};
const test = [
	{
		id: "horizontal-1",
		sourcePosition: "right",
		type: "input",
		className: "dark-node",
		data: { label: <Input /> },
		position: { x: 0, y: 180 },
	},
	{
		id: "horizontal-2",
		sourcePosition: "right",
		targetPosition: "left",
		data: { label: <FlowTemplate /> },
		position: { x: 250, y: 0 },
	},
	{
		id: "horizontal-3",
		sourcePosition: "right",
		targetPosition: "left",
		data: { label: <FlowTemplate /> },
		position: { x: 250, y: 250 },
	},
	{
		id: "horizontal-4",
		sourcePosition: "right",
		targetPosition: "left",
		data: { label: <FlowTemplate /> },
		position: { x: 500, y: 0 },
	},
	{
		id: "horizontal-5",
		sourcePosition: "top",
		targetPosition: "bottom",
		data: { label: <FlowTemplate /> },
		position: { x: 650, y: 210 },
	},
	{
		id: "horizontal-6",
		sourcePosition: "bottom",
		targetPosition: "top",
		data: { label: <FlowTemplate /> },
		position: { x: 430, y: 380 },
	},
	{
		id: "horizontal-7",
		sourcePosition: "right",
		targetPosition: "left",
		data: { label: <FlowTemplate /> },
		position: { x: 850, y: 50 },
	},
	{
		id: "horizontal-8",
		sourcePosition: "right",
		targetPosition: "left",
		data: { label: <FlowTemplate /> },
		position: { x: 650, y: 500 },
	},
	{
		id: "horizontal-9",
		type: "output",
		sourcePosition: "right",
		targetPosition: "left",
		data: { label: <Output /> },
		position: { x: 750, y: 0 },
	},
	{
		id: "horizontal-10",
		type: "output",
		sourcePosition: "right",
		targetPosition: "left",
		data: { label: <Output /> },
		position: { x: 850, y: 500 },
	},

	{
		id: "horizontal-e1-2",
		source: "horizontal-1",
		type: "smoothstep",
		target: "horizontal-2",
		animated: true,
	},
	{
		id: "horizontal-e1-3",
		source: "horizontal-1",
		type: "smoothstep",
		target: "horizontal-3",
		animated: true,
	},
	{
		id: "horizontal-e1-4",
		source: "horizontal-2",
		type: "smoothstep",
		target: "horizontal-4",
		animated: true,
	},
	{
		id: "horizontal-e3-5",
		source: "horizontal-3",
		type: "smoothstep",
		target: "horizontal-5",
		animated: true,
	},
	{
		id: "horizontal-e3-6",
		source: "horizontal-3",
		type: "smoothstep",
		target: "horizontal-6",
		animated: true,
	},
	{
		id: "horizontal-e5-7",
		source: "horizontal-5",
		type: "smoothstep",
		target: "horizontal-7",
		animated: true,
	},
	{
		id: "horizontal-e6-8",
		source: "horizontal-6",
		type: "smoothstep",
		target: "horizontal-8",
		animated: true,
	},
	{
		id: "horizontal-e5-9",
		source: "horizontal-4",
		type: "smoothstep",
		target: "horizontal-9",
		animated: true,
	},
	{
		id: "horizontal-e6-10",
		source: "horizontal-8",
		type: "smoothstep",
		target: "horizontal-10",
		animated: true,
	},
];

const element = [
	// initial elements
	{
		id: "1",
		type: "input", // input node
		sourcePosition: "right",
		data: { label: <Input /> },
		position: { x: 132, y: 289 },
	},
	{
		id: "2",
		type: "default",
		targetPosition: "left",
		sourcePosition: "right",
		position: { x: 345, y: 212 },
		data: {
			label: <FlowTemplate test={true} />,
		},
	},
	{
		id: "3",
		type: "output", // output node
		data: { label: <Output /> },
		position: { x: 642, y: 644 },
	},
];
let id = 0;

export default function Flow({ user }) {
	const getId = () => {
		id++;
		return `node_${id}`;
	};

	const reactFlowWrapper = useRef(null);
	const [reactFlowInstance, setReactFlowInstance] = useState(null);
	const [elements, setElements] = useState([]);
	const [load, setLoad] = useState(true);

	const onConnect = (params) => setElements((els) => addEdge(params, els));

	const onElementsRemove = (elementsToRemove) =>
		setElements((els) => removeElements(elementsToRemove, els));

	const onLoad = (_reactFlowInstance) =>
		setReactFlowInstance(_reactFlowInstance);

	const onDragOver = (event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	};

	const onDrop = (event) => {
		event.preventDefault();

		const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
		const type = event.dataTransfer.getData("application/reactflow");
		const position = reactFlowInstance.project({
			x: event.clientX - reactFlowBounds.left,
			y: event.clientY - reactFlowBounds.top,
		});
		if (type === "default") {
			const newNode = {
				id: getId(),
				type,
				targetPosition: "left",
				sourcePosition: "right",
				position,
				data: {
					label: <FlowTemplate id={id} />,
				},
			};
			setElements((es) => es.concat(newNode));
		}
		if (type === "input") {
			const newNode = {
				id: getId(),
				type,
				sourcePosition: "right",
				position,
				data: { label: <Input /> },
			};

			setElements((es) => es.concat(newNode));
		}
		if (type === "output") {
			const newNode = {
				id: getId(),
				type,
				position,
				data: { label: <Output /> },
			};

			setElements((es) => es.concat(newNode));
		}
	};
	useEffect(() => {
		setTimeout(() => setLoad(false), 800);
	}, []);
	if (load) {
		return <LoadingAnimation />;
	}
	return (
		<>
			<header className="rf__header">
				<h2 className="rf__title">
					{user.certified ? "Create Flow" : "Current Flow"}
					<h6>
						<i>{user.certified ? "" : " by your trainer Louis Flores"}</i>
					</h6>
				</h2>

				<div className="rf__actions">
					{user.certified ? (
						<Buttons text="send to client" className="rf__send-btn" />
					) : null}
					<Buttons
						text="save"
						type="file"
						className="rf__send-btn"
						onClick={() => {
							localStorage.setItem("current_flow", JSON.stringify(elements));
						}}
					/>
				</div>
			</header>
			<ReactFlowProvider>
				<div ref={reactFlowWrapper}>
					<div style={{ height: 700 }}>
						{user.certified ? (
							<ReactFlow
								elements={elements}
								onConnect={onConnect}
								onElementsRemove={onElementsRemove}
								onLoad={onLoad}
								onDrop={onDrop}
								onDragOver={onDragOver}
							></ReactFlow>
						) : (
							<ReactFlow elements={test} onConnect={onConnect}></ReactFlow>
						)}
					</div>
				</div>
				{user.certified ? <FlowSidebar /> : null}
			</ReactFlowProvider>
		</>
	);
}

import React, { useCallback, useState, useRef } from "react";
import ReactFlow, {
	removeElements,
	ReactFlowProvider,
	addEdge,
} from "react-flow-renderer";
import Buttons from "../Buttons/Buttons";
import FlowSidebar from "../FlowSidebar/FlowSidebar";
import FlowTemplate from "../FlowTemplate/FlowTemplate";
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

const dataMode = [
	{
		id: "node_1",
		type: "default",
		targetPosition: "left",
		sourcePosition: "right",
		position: { x: 355, y: 321 },
		data: {
			label: {
				key: null,
				ref: null,
				props: { id: 1 },
				_owner: null,
				_store: {},
			},
		},
	},
	{
		id: "node_2",
		type: "input",
		sourcePosition: "right",
		position: { x: 147, y: 108 },
		data: {
			label: { key: null, ref: null, props: {}, _owner: null, _store: {} },
		},
	},
	{
		id: "node_4",
		type: "output",
		position: { x: 678, y: 487 },
		data: {
			label: { key: null, ref: null, props: {}, _owner: null, _store: {} },
		},
	},
	{
		id: "node_5",
		type: "default",
		targetPosition: "left",
		sourcePosition: "right",
		position: { x: 207, y: 372 },
		data: {
			label: {
				key: null,
				ref: null,
				props: { id: 5 },
				_owner: null,
				_store: {},
			},
		},
	},
	{ id: 0.42377120733097096, source: "node_2", target: "node_1" },
	{ id: 0.9797164169669692, source: "node_2", target: "node_5" },
	{ id: 0.9606547699463113, source: "node_5", target: "node_4" },
	{
		id: "node_6",
		type: "default",
		targetPosition: "left",
		sourcePosition: "right",
		position: { x: 805, y: 159 },
		data: {
			label: {
				key: null,
				ref: null,
				props: { id: 6 },
				_owner: null,
				_store: {},
			},
		},
	},
	{ id: 0.9534181404577472, source: "node_1", target: "node_6" },
	{ id: 0.6670547384128428, source: "node_6", target: "node_4" },
];
const element = [
	// initial elements
	{
		id: "1",
		type: "input", // input node
		sourcePosition: "right",
		data: { label: <Input /> },
		position: { x: 100, y: 0 },
	},
	// {
	// 	id: "3",
	// 	type: "output", // output node
	// 	data: { label: <Output /> },
	// 	position: { x: 500, y: 500 },
	// },
];
let id = 0;

export default function Flow() {
	const getId = () => {
		id++;
		return `node_${id}`;
	};

	const reactFlowWrapper = useRef(null);
	const [reactFlowInstance, setReactFlowInstance] = useState(null);
	const [elements, setElements] = useState([]);

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

	console.log(JSON.parse(localStorage.getItem("current_flow")));
	return (
		<>
			<header className="rf__header">
				<h2 className="rf__title">Create Flow</h2>
				<div className="rf__actions">
					<Buttons text="send to client" className="rf__send-btn" />
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
						<ReactFlow
							elements={elements}
							onConnect={onConnect}
							onElementsRemove={onElementsRemove}
							onLoad={onLoad}
							onDrop={onDrop}
							onDragOver={onDragOver}
						></ReactFlow>
					</div>
				</div>
				<FlowSidebar />
			</ReactFlowProvider>
		</>
	);
}

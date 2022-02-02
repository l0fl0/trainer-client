import React from "react";
import "./FlowSidebar.scss";
export default () => {
	const onDragStart = (event, nodeType) => {
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";
	};

	return (
		<aside className="sidebar">
			<div className="sidebar__desc">
				You can drag these nodes to place on the pane.
			</div>
			<div className="sidebar__nodes">
				<div
					className="sidebar__input"
					onDragStart={(event) => onDragStart(event, "input")}
					draggable
				>
					Client Info
				</div>
				<div
					className="sidebar__node"
					onDragStart={(event) => onDragStart(event, "default")}
					draggable
				>
					Default Template
				</div>
				<div
					className="sidebar__output"
					onDragStart={(event) => onDragStart(event, "output")}
					draggable
				>
					Client Goal
				</div>
			</div>
		</aside>
	);
};

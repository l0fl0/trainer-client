import { useState } from "react";
import "./FlowTemplate.scss";

let key = 0;

export default function FlowTemplate({
	date,
	subjective,
	objective,
	exerciseName,
	sets,
	reps,
	load,
	notes,
	id,
}) {
	let [exercises, setExercises] = useState([]);
	const getKey = () => {
		key++;
		return `workout_${key}`;
	};
	const addNewExercise = (e) => {
		let newExercise = (
			<article className="flow-card__exercise" key={getKey()}>
				<h4
					className="flow-card__exercise-title"
					contentEditable
					suppressContentEditableWarning={true}
				>
					"workout"
				</h4>
				<div className="flow-card__exercise-metrics">
					<div>
						<h5>sets</h5>
						<p contentEditable suppressContentEditableWarning={true}>
							{sets}
						</p>
					</div>
					<div>
						<h5>reps</h5>
						<p contentEditable suppressContentEditableWarning={true}>
							{reps}
						</p>
					</div>
					<div>
						<h5>load</h5>
						<p contentEditable suppressContentEditableWarning={true}>
							{load}
						</p>
					</div>
				</div>
			</article>
		);
		setExercises([...exercises, newExercise]);
	};
	return (
		<>
			<section className="flow-card" id={`node_${id}`}>
				<div>
					<h3 className="flow-card__subheader">
						Date:{" "}
						<span contentEditable suppressContentEditableWarning={true}>
							MM/DD/YY
						</span>
					</h3>
				</div>
				<div>
					<h3 className="flow-card__subheader">Subjective</h3>
					<p contentEditable suppressContentEditableWarning={true}>
						{subjective}
					</p>
				</div>
				<div>
					<h3 className="flow-card__subheader">Objective</h3>
					<p contentEditable suppressContentEditableWarning={true}>
						{objective}
					</p>
				</div>
				<section>
					<h3 className="flow-card__subheader">
						Exercises <span onClick={addNewExercise}>+</span>
					</h3>
					{exercises.map((el) => el)}

					<div>
						<h3 className="flow-card__subheader">Notes</h3>
						<p contentEditable suppressContentEditableWarning={true}>
							{notes}
						</p>
					</div>
				</section>
			</section>
		</>
	);
}

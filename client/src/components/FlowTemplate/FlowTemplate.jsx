import "./FlowTemplate.scss";

export default function FlowTemplate() {
	return (
		<section className="flow-card">
			<div>
				<h3 className="flow-card__subheader">
					Date: <span>04/24/22</span>
				</h3>
			</div>
			<div>
				<h3 className="flow-card__subheader">Subjective</h3>
				<i>Change field at the start of each training</i>
				<p></p>
			</div>
			<div>
				<h3 className="flow-card__subheader">Objective</h3>
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam,
					doloremque.
				</p>
			</div>
			<section>
				<h3 className="flow-card__subheader">Exercises</h3>
				<article className="flow-card__exercise">
					<h4 className="flow-card__exercise-title">Warmup routine</h4>
					<div>
						<h5>sets</h5>
						<p>4</p>
					</div>
					<div>
						<h5>reps</h5>
						<p>12-15</p>
					</div>
				</article>
				<article className="flow-card__exercise">
					<h4 className="flow-card__exercise-title">Plyometrics</h4>
					<div>
						<h5>sets</h5>
						<p>4</p>
					</div>
					<div>
						<h5>reps</h5>
						<p>12-15</p>
					</div>
				</article>
			</section>
		</section>
	);
}

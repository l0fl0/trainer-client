import React from "react";

export default function ActivityCard({ activity }) {
	console.log(activity);
	if (!activity) return null;
	return (
		<li key={activity.id}>
			<div>
				{activity.name} {activity.type}
			</div>
			<div>
				{activity.elapsed_time} {activity.distance}
			</div>
		</li>
	);
}

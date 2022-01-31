import React from "react";
import "./ActivityCard.scss";
export default function ActivityCard({ activity }) {
	const secondsFormatter = (seconds) => {
		if (seconds > 3600) {
			let min = Math.round(seconds / 60) - Math.round(seconds / 3600) * 60;

			if (min < 10) {
				min = `0${min}`;
			}

			let sec = Math.round(seconds % 60);
			if (sec < 10) {
				sec = `0${sec}`;
			}
			return `${Math.round(seconds / 3600)}:${min}:${sec}`;
		}

		if (seconds > 60) {
			return `${Math.round(seconds / 60)}m ${Math.round(seconds % 60)}s`;
		}

		return `${seconds}s`;
	};
	const distanceFormatter = (meters) => {
		if (meters > 500) {
			return `${Math.round(meters / 10) / 100}km`;
		}

		return `${Math.round(meters)}m`;
	};

	const dateFormat = (iso) => {
		let unix = Date.parse(iso);
		let date = new Date(unix);
		let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		let month = date.getMonth() + 1;
		let dayOfMonth = date.getDate();

		if (month < 10) {
			month = `0${month}`;
		}

		if (dayOfMonth < 10) {
			dayOfMonth = `0${dayOfMonth}`;
		}

		return `${
			days[date.getDay()]
		}, ${month}/${dayOfMonth}/${date.getFullYear()}`;
	};
	if (!activity) return null;
	return (
		<li
			className="card"
			onClick={() =>
				(window.location = `https://www.strava.com/activities/${activity.id}`)
			}
		>
			<div className="card__row">
				<p>{activity.type}</p>
				<p>{dateFormat(activity.start_date_local)}</p>
			</div>
			<div className="card__row">
				<p>{secondsFormatter(activity.elapsed_time)}</p>
				<p>{activity.distance ? distanceFormatter(activity.distance) : null}</p>
			</div>
		</li>
	);
}

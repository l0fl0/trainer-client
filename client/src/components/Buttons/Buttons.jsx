import "./Buttons.scss";
import React from "react";

export default function Buttons({
	onClick,
	className,
	type,
	text,
	imgLeft,
	iconLeft,
	iconRight,
}) {
	return (
		<button
			onClick={onClick}
			className={`${className ? className : ""} btn`}
			type={type}
		>
			{imgLeft ? <img src={imgLeft} className="btn__img" /> : ""}

			{iconLeft ? (
				<i className={iconLeft + " btn__icon btn__icon--left"} />
			) : (
				""
			)}

			{text}

			{iconRight ? (
				<i className={iconRight + " btn__icon btn__icon--right"} />
			) : (
				""
			)}
		</button>
	);
}

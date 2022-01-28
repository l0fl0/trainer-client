import React from "react";
import "./Input.scss";
export default function Input({
	name,
	id,
	onChange,
	className,
	label,
	placeholder,
	disabled,
	type,
	checked,
}) {
	return (
		<>
			<label htmlFor={name}>
				{label}
				<input
					className={className}
					type={type}
					name={name}
					id={id ? id : name}
				/>
			</label>
		</>
	);
}

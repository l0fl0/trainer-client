import Buttons from "../Buttons/Buttons";
import "./ProgramBuilderForm.scss";
export default function ProgramBuilderForm({ onChangeHandler, isVisible }) {
	const handleProgramSubmit = () => {};

	if (!isVisible) {
		return null;
	}
	return (
		<form
			onSubmit={handleProgramSubmit}
			className="program-form"
			onChange={onChangeHandler}
		>
			<input type="text" name="date" />
			<input type="text" name="subjective" />
		</form>
	);
}

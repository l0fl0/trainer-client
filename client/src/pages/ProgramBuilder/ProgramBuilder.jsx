import React from "react";
import ProgramBuilderForm from "../../components/ProgramBuilderForm/ProgramBuilderForm";
import Flow from "../../components/Flow/Flow";
import "./ProgramBuilder.scss";
export default function ProgramBuilder() {
	return (
		<div>
			<ProgramBuilderForm />
			<Flow />
		</div>
	);
}

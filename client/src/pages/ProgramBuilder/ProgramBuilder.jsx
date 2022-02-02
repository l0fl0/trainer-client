import React, { useState } from "react";
import ProgramBuilderForm from "../../components/ProgramBuilderForm/ProgramBuilderForm";
import Flow from "../../components/Flow/Flow";
import "./ProgramBuilder.scss";

export default function ProgramBuilder({ user }) {
	return <Flow user={user} />;
}

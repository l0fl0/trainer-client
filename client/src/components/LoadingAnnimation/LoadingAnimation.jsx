import "./LoadingAnimation.scss";
export default function LoadingAnimation() {
	//loading animation from https://loading.io/css/

	return (
		<main className="lds-wrapper">
			<div className="lds-spinner">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</main>
	);
}

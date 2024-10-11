import "./OptionsButton.css";

export default function OptionsButton({ action }) {
	return (
		<div className="options-button" onClick={action}>
			<i className="fa-solid fa-ellipsis-vertical options-button-icon"></i>
		</div>
	);
}

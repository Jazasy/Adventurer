import "./XButton.css";

export default function XButton({ action }) {
	return <i onClick={action} className="fa-solid fa-xmark x-button"></i>;
}

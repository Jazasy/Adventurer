import "./PostWindow.css";
import TextArea from "../inputs/TextArea";
import XButton from "../Buttons/XButton";

export default function PostWindow({closeShowPostWindow}) {
	return (
		<main className="post-window-container">
			<div className="post-window">
				<XButton action={closeShowPostWindow}/>
				<p>Tell about your experience</p>
				<TextArea />
			</div>
		</main>
	);
}

import "./PostWindow.css";
import TextArea from "../inputs/TextArea";
import XButton from "../Buttons/XButton";
import Button1 from "../Buttons/Button1";
import FileInput from "../inputs/FileInput";

export default function PostWindow({closeShowPostWindow}) {
	return (
		<main className="post-window-container">
			<div className="post-window">
				<XButton action={closeShowPostWindow}/>
				<p>Tell about your experience</p>
				<TextArea rows={5}/>
				<FileInput />
				<Button1 text="Post" className="btn-fit-content btn-big post-submit-button"/>
			</div>
		</main>
	);
}

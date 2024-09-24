import "./CommentBar.css";
import TextInput from "../inputs/TextInput";
import Button1 from "../Buttons/Button1";
import { useState } from "react";
import axios from "axios";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";
import { useAdventures } from "../../contexts/useAdventures";

export default function CommentBar({ action }) {
	const [comment, setComment] = useState("");
	const { setResInfos } = useAdventures();
	const { user } = useAdventures();
	const { postIdForComments } = useAdventures();
	const userId = user ? user._id : "";

	const handleChange = (event) => {
		setComment(event.target.value);
	};

	const postComment = async (event) => {
		try {
            event.preventDefault();
			await axios.post(`/posts/${postIdForComments}/comments`, {
				userId,
				comment,
			});
            setComment("");
			action();
		} catch (error) {
			if (!error.response) return console.log(error);
			resInfoError(error.response.data.message, setResInfos);
		}
	};

	return (
		<form className="comment-bar" onSubmit={postComment}>
			<TextInput value={comment} handleChange={handleChange} />
			<button type="submit" className="com-fake-button">
				submit
			</button>
			<Button1
				action={postComment}
				text="post"
				className="btn-fit-content btn-big"
			/>
		</form>
	);
}

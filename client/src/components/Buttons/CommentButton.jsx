import "./CommentButton.css";
import { useAdventures } from "../../contexts/useAdventures";

export default function CommentButton({ action, postId }) {
	const { setPostIdForComments } = useAdventures();

	const clickComment = () => {
		setPostIdForComments(postId);
		//action();
	};

	return (
		<div className="comment-button">
			<i
				className="fa-regular fa-comment comment-icon"
				onClick={clickComment}
			></i>
		</div>
	);
}

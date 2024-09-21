import "./CommentButton.css";
import { useAdventures } from "../../contexts/useAdventures";

export default function CommentButton({ action }) {
	const { setShowCommentSection } = useAdventures();

	const clickComment = () => {
		setShowCommentSection((oldShowCommentSection) => !oldShowCommentSection);
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

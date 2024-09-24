import "./CommentSectionContainer.css";
import { useAdventures } from "../../contexts/useAdventures";
import CommentSection from "./CommentSection";

export default function CommentSectionContainer() {
	const { postIdForComments } = useAdventures();;

	return (
		<>
			{postIdForComments ? (
				<div className="comment-section-container">
					<CommentSection/>
				</div>
			) : null}
		</>
	);
}

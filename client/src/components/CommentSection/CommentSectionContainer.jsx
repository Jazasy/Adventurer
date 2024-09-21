import "./CommentSectionContainer.css";
import { useAdventures } from "../../contexts/useAdventures";
import { useState, useEffect } from "react";
import CommentSection from "./CommentSection";

export default function CommentSectionContainer({ postId }) {
	const [comments, setComments] = useState([]);
	const { showCommentSection } = useAdventures();

	// UseEffect to fetch comments

	return (
		<>
			{showCommentSection ? (
				<div className="comment-section-container">
					<CommentSection />
				</div>
			) : null}
		</>
	);
}

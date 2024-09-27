import "./CommentSection.css";
import { useAdventures } from "../../contexts/useAdventures";
import CommentBar from "./CommentBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";
import Comment from "./Comment";

export default function CommentSection() {
	const { postIdForComments, setPostIdForComments } = useAdventures();
	const { setResInfos } = useAdventures();
	const [comments, setComments] = useState([]);

	const getComments = async () => {
		try {
			const fetchedComments = await axios.get(
				`/posts/${postIdForComments}/comments`
			);
			setComments(fetchedComments.data.reverse());
		} catch (error) {
			resInfoError(error.response.data.message, setResInfos);
		}
	};

	const addComment = (newComment) => {
		//If I use this instead of getComments, I can skip a request, and make the comment appear instantly
		setComments((oldComments) => [newComment, ...oldComments]);
	};

	useEffect(() => {
		axios
			.get(`/posts/${postIdForComments}/comments`)
			.then((res) => setComments(res.data.reverse()))
			.catch((error) => resInfoError(error.response.data.message, setResInfos));
	}, [postIdForComments, setResInfos]);

	const closeCommentSection = () => {
		setPostIdForComments(null);
	};

	return (
		<div className="comment-section">
			<i
				onClick={closeCommentSection}
				className="fa-solid fa-xmark comment-section-x"
			></i>
			<ul className="comments">
				{comments.map((comment) => (
					<Comment comment={comment} key={comment._id} />
				))}
			</ul>
			<CommentBar action={getComments} />
		</div>
	);
}

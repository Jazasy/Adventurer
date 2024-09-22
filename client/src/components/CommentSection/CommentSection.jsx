import "./CommentSection.css";
import { useAdventures } from "../../contexts/useAdventures";
import CommentBar from "./CommentBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";

export default function CommentSection({ postId }) {
	const { setShowCommentSection } = useAdventures();
    const { setResInfos } = useAdventures();
	const [comments, setComments] = useState([]);

    const getComments = async () => {
        try {
            const fetchedComments = await axios.get(`/posts/${postId}/comments`);
            setComments(fetchedComments.data);
        } catch (error) {
            resInfoError(error.response.data.message, setResInfos);
        }
    }

    const addComment = (newComment) => {                                //If I use this instead of getComments, I can skip a request, and make the comment appear instantly
        setComments(oldComments => [...oldComments, newComment]);
    }

	useEffect(() => {
		axios
			.get(`/posts/${postId}/comments`)
			.then((res) => setComments(res.data))
			.catch((error) => resInfoError(error.response.data.message, setResInfos));
	}, [postId, setResInfos]);

	const closeCommentSection = () => {
		setShowCommentSection(false);
	};

	return (
		<div className="comment-section">
			<i
				onClick={closeCommentSection}
				className="fa-solid fa-xmark comment-section-x"
			></i>
			<ul>
				{comments.map((comment) => (
					<li key={comment._id}>{comment.content}</li>
				))}
			</ul>
			<CommentBar postId={postId} action={getComments}/>
		</div>
	);
}

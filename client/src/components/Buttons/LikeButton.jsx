import "./LikeButton.css";
import { useState } from "react";
import { useAdventures } from "../../contexts/useAdventures";
import { useEffect } from "react";
import axios from "axios";

export default function LikeButton({ postId, likeAction, unlikeAction }) {
	const [isLikeActive, setIsLikeActive] = useState(false);
	const { user } = useAdventures();
	const userId = user ? user._id : null;

	//if there is a post object, I would use useEffect to set the default value of isLikeActive
	useEffect(() => {
		if (userId && postId) {
			axios
				.get(`/posts/${postId}/${userId}`)
				.then((res) => {
					setIsLikeActive(res.data);
				})
				.catch((error) => console.log(error));
		}
	}, [postId, userId, user]);

	const clickLike = () => {
		if (isLikeActive) {
			unlikeAction();
		} else {
			likeAction();
		}
		user && setIsLikeActive((oldIsLikeActive) => !oldIsLikeActive);
	};

	return (
		<div className="comment-button">
			{isLikeActive ? (
				<i
					className="fa-solid fa-heart like-icon like-icon-clicked"
					onMouseDown={clickLike}
				></i>
			) : (
				<i
					className="fa-regular fa-heart like-icon"
					onMouseDown={clickLike}
				></i>
			)}
		</div>
	);
}

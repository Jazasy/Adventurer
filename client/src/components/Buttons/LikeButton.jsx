import "./LikeButton.css";
import { useState } from "react";

export default function LikeButton({ action, post = {} }) {
	const [isLikeActive, setIsLikeActive] = useState(false);

	//if there is a post object, I would use useEffect to set the default value of isLikeActive

	const clickLike = () => {
		setIsLikeActive((oldIsLikeActive) => !oldIsLikeActive);
		//action();
	};

	return (
		<div className="comment-button">
			{isLikeActive ? (
				<i
					className="fa-solid fa-heart like-icon like-icon-clicked"
					onMouseDown={clickLike}
				></i>
			) : (
				<i className="fa-regular fa-heart like-icon" onMouseDown={clickLike}></i>
			)}
		</div>
	);
}

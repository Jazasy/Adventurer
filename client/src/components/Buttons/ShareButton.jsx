import "./ShareButton.css";
import { useState } from "react";

export default function ShareButton() {
	const [isShareActive, setIsShareActive] = useState(false);

	const clickShare = () => {
		setIsShareActive((oldIsShareActive) => !oldIsShareActive);
		//action();
	};

	return (
		<div className="comment-button">
			{isShareActive ? (
				<i
					className="fa-solid fa-share-from-square share-icon"
					onClick={clickShare}
				></i>
			) : (
				<i
					className="fa-regular fa-share-from-square share-icon"
					onClick={clickShare}
				></i>
			)}
		</div>
	);
}

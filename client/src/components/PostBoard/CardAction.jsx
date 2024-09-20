import CommentButton from "../Buttons/CommentButton";
import LikeButton from "../Buttons/LikeButton";
import ShareButton from "../Buttons/ShareButton";
import "./CardAction.css";
import axios from "axios";
import { useAdventures } from "../../contexts/useAdventures";
import { useState, useEffect } from "react";

export default function CardAction({ post }) {
	const { user } = useAdventures();

	const action = async () => {
		await axios.put(`/posts/${post._id}/likes`, { userId: user._id });
	};

	return (
		<div className="card-action">
			<LikeButton action={action} />
			<CommentButton />
			<ShareButton />
		</div>
	);
}

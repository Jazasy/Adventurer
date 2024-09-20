import CommentButton from "../Buttons/CommentButton";
import LikeButton from "../Buttons/LikeButton";
import ShareButton from "../Buttons/ShareButton";
import "./CardAction.css";
import axios from "axios";
import { useAdventures } from "../../contexts/useAdventures";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";

export default function CardAction({ post }) {
	const { user } = useAdventures();
	const { setResInfos } = useAdventures();
	const userId = user ? user._id : "";

	const like = async () => {
		try {
			await axios.put(`/posts/${post._id}/likes`, { userId });
		} catch (error) {
			resInfoError(error.response.data.message, setResInfos);
		}
	};

	const unLike = async () => {
		try {
			await axios.delete(`/posts/${post._id}/likes`, {
				params: { userId },
			});
		} catch (error) {
			resInfoError(error.response.data.message, setResInfos);
		}
	};

	return (
		<div className="card-action">
			<LikeButton postId={post._id} likeAction={like} unlikeAction={unLike} />
			<CommentButton />
			<ShareButton />
		</div>
	);
}

import CommentButton from "../Buttons/CommentButton";
import LikeButton from "../Buttons/LikeButton";
import ShareButton from "../Buttons/ShareButton";
import "./CardAction.css";
import axios from "axios";
import { useAdventures } from "../../contexts/useAdventures";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";
import DeleteButton from "../Buttons/DeleteButton";

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

	const deletePost = async () => {
		try {
			const result = await axios.delete(`/posts/${post._id}`);

			if (result.data.message) {
				resInfoError(result.data.message, setResInfos);
			}
		} catch (error) {
			if (error.response.data.message) {
				resInfoError(error.response.data.message, setResInfos);
			}
		}
	}

	return (
		<div className="card-action">
			<img src={post.author.pfp} alt="post author pfp" />
			<LikeButton postId={post._id} likeAction={like} unlikeAction={unLike} />
			<CommentButton postId={post._id} />
			{post.author._id === userId ? <DeleteButton action={deletePost} /> : null}
			{/* <ShareButton /> */}
		</div>
	);
}

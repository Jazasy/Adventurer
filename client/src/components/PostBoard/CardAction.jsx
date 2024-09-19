import CommentButton from "../Buttons/CommentButton";
import LikeButton from "../Buttons/LikeButton";
import ShareButton from "../Buttons/ShareButton";
import "./CardAction.css";

export default function CardAction({ post }) {

	return (
		<div className="card-action">
			<LikeButton post={post}/>
            <CommentButton />
			<ShareButton />
		</div>
	);
}

import "./Post.css";
import PostCard from "./PostCard";
import CommentSection from "../CommentSection/CommentSectionContainer";

export default function Post({ post }) {
	return (
		<div className="post">
			<PostCard post={post} />
			<CommentSection postId={post._id}/>
		</div>
	);
}

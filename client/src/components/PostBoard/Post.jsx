import "./Post.css";
import PostCard from "./PostCard";

export default function Post({ post }) {
	return (
		<div className="post">
			<PostCard post={post} />
		</div>
	);
}

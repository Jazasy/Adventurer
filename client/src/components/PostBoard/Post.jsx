import "./Post.css";
import PostCard from "./PostCard";

export default function Post({ post, setRefreshPosts }) {
	return (
		<div className="post">
			<PostCard post={post} setRefreshPosts={setRefreshPosts}/>
		</div>
	);
}

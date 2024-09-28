import "./CardStatic.css";

export default function CardStatic({ post }) {
	return (
		<div className="card-static">
			<img className="post-image" src={post.image} alt="post imgae" />
			<section className="post-content">
				<p className="post-author">{post.author.username}</p>
				<p>{post.content}</p>
			</section>
		</div>
	);
}

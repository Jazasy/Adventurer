import "./Comment.css";

export default function Comment({ comment}) {
	return (
		<li className="comment" key={comment._id}>
			<div className="comment-head">
				<img
					className="comment-pfp"
					src={comment.author.pfp}
					alt="profile picture"
				/>
				<span className="comment-author">{comment.author.username}: </span>
			</div>
			<p className="comment-content">{comment.content}</p>
		</li>
	);
}

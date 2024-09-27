import "./CardStatic.css";

export default function CardStatic({ post }) {
    return (
        <div className="card-static">
            <img className="post-image" src={post.image} alt="post imgae" />
            <p className="post-content">{post.content}</p>
        </div>
    )
}
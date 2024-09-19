import "./CardStatic.css";

export default function CardStatic({ post }) {
    return (
        <div className="card-static">
            <img className="post-image" src={post.image} alt="post imgae" />
            <h3 className="post-content">{post.content}</h3>
        </div>
    )
}
import "./PostCard.css";

export default function PostCard({ post }) {
    return (
        <div className="post-card">
            <img className="post-image" src={post.image} alt="post imgae" />
        </div>
    )
}
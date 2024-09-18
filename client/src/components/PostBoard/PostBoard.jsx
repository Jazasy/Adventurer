import "./PostBoard.css";
import PostCard from "../PostBoard/PostCard";

export default function PostBoard({ posts }) {
    return (
        <section className="post-board">
            {posts.map(post => {
                return <PostCard key={post._id} post={post}/>
            })}
        </section>
    )
}
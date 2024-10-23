import CardAction from "./CardAction";
import CardStatic from "./CardStatic";
import "./PostCard.css";

export default function PostCard({ post, setRefreshPosts }) {
    return (
        <div className="post-card">
            <CardStatic post={post} />
            <CardAction post={post} setRefreshPosts={setRefreshPosts}/>
        </div>
    )
}
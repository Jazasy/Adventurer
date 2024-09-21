import "./PostBoard.css";
import Post from "./Post";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PostBoard({ adventureId }) {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios.get(`/posts/${adventureId}`).then((res) => setPosts(res.data));
	}, [adventureId]);

	return (
		<>
			{posts.length > 0 ? (
				<section className="post-board">
					{posts.map((post) => {
						return <Post key={post._id} post={post} />;
					})}
				</section>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
}

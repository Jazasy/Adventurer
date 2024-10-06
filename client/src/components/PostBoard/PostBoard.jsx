import "./PostBoard.css";
import Post from "./Post";
import CommentSectionContainer from "../CommentSection/CommentSectionContainer";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function PostBoard({ adventureId, showPostWindow }) {
	const [posts, setPosts] = useState([]);
	const prevShowPostWindow = useRef(showPostWindow);

	useEffect(() => {
		axios.get(`/posts/${adventureId}`).then((res) => setPosts(res.data));
	}, [adventureId]);

	useEffect(() => {
		// Its the same as the previous useEffect, but it will only run if showPostWindow changes to false
		if (prevShowPostWindow.current && !showPostWindow) {
			axios.get(`/posts/${adventureId}`).then((res) => setPosts(res.data));
		}
		prevShowPostWindow.current = showPostWindow;
	}, [showPostWindow]);

	return (
		<>
			{posts.length > 0 ? (
				<section className="post-board">
					{posts.map((post) => {
						return <Post key={post._id} post={post} />;
					})}
					<CommentSectionContainer />
				</section>
			) : (
				<section className="post-board"></section>
			)}
		</>
	);
}

import "./PostBoard.css";
import Post from "./Post";
import CommentSectionContainer from "../CommentSection/CommentSectionContainer";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useAdventures } from "../../contexts/useAdventures";

export default function PostBoard({ adventureId, userId, showPostWindow }) {
	const [posts, setPosts] = useState(null);
	const prevAdventureId = useRef(adventureId);
	const prevShowPostWindow = useRef(showPostWindow);

	useEffect(() => {
		//this previous adventureId checking mechanism is for to delete posts when the user changes the adventure. Otherwise, the posts will be kept in the state.
		if (adventureId) {
			if (prevAdventureId.current !== adventureId) {
				setPosts(null);
			}
			prevAdventureId.current = adventureId;

			axios.get(`/posts/${adventureId}`).then((res) => setPosts(res.data));
		}
		if (userId) {
			setPosts(null);
			axios.get(`/posts/users/${userId}`).then((res) => setPosts(res.data));
		}
	}, [adventureId, userId]);

	useEffect(() => {
		// Its the same as the previous useEffect, but it will only run if showPostWindow changes to false
		if (prevShowPostWindow.current && !showPostWindow) {
			axios.get(`/posts/${adventureId}`).then((res) => setPosts(res.data));
		}
		prevShowPostWindow.current = showPostWindow;
	}, [showPostWindow, adventureId]);

	return (
		<>
			{posts ? (
				posts.length > 0 ? (
					<section className="post-board">
						{posts.map((post) => {
							return <Post key={post._id} post={post}/>;
						})}
						<CommentSectionContainer />
					</section>
				) : (
					<section className="post-board"></section>
				)
			) : (
				<Loader className="loader-big" />
			)}
		</>
	);
}

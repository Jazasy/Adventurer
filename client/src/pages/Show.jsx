import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAdventures } from "../contexts/useAdventures";
import ShowHead from "../components/ShowHead/ShowHead";
import PostBoard from "../components/PostBoard/PostBoard";
import "./Show.css";

export default function Show() {
	const { selectedAdventure, setSelectedAdventure } = useAdventures();
	const { id } = useParams();

	useEffect(() => {
		if (!selectedAdventure) {
			axios
				.get(`/adventures/${id}`)
				.then((res) => setSelectedAdventure(res.data));
		}
	}, [id, selectedAdventure, setSelectedAdventure]);

	useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }, []);

	return (
		<>
			{selectedAdventure ? (
				<div className="show-container">
					<ShowHead adventure={selectedAdventure} />
					<div className="show-main-content">
						<PostBoard posts={selectedAdventure.posts} />
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
}

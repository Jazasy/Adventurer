import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAdventures } from "../contexts/useAdventures";

export default function Show() {
	const { selectedAdventure, setSelectedAdventure } = useAdventures();
	const { id } = useParams();
	useEffect(() => {
		if (!selectedAdventure) {
			axios.get(`/adventures/${id}`).then((res) => setSelectedAdventure(res.data));
		}
	}, [id, selectedAdventure, setSelectedAdventure]);

	/* const { id } = useParams();
	const [adventure, setAdventure] = useState(null);
	useEffect(() => {
		axios.get(`/adventures/${id}`).then((res) => setAdventure(res.data));
	}, []); */

	return (
		<>
			{selectedAdventure ? (
				<div>
					<p>{selectedAdventure.title}</p>
					<p>{selectedAdventure.leader.username}</p>
					<p>{selectedAdventure.description}</p>
					<p>{selectedAdventure.date}</p>
					<p>{selectedAdventure.location}</p>
					{selectedAdventure.posts.map(post => {
						return (
							<div key={post}>
								<p>{post.content}</p>
								<img src={post.image} />
							</div>
						)
					})}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
}

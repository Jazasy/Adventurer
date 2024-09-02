import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAdventures } from "../contexts/useAdventures";

export default function Show() {
	const { selectedAdventure } = useAdventures();

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
				</div>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
}

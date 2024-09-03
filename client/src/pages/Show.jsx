import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAdventures } from "../contexts/useAdventures";

export default function Show() {
	const { selectedAdventure, setSelectedAdventure } = useAdventures();
	const { id } = useParams();
	useEffect(()=>{
		if(!selectedAdventure) {
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
				</div>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
}

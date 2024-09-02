import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Show() {
	const { id } = useParams();
	const [adventure, setAdventure] = useState(null);
	useEffect(() => {
		axios.get(`/adventures/${id}`).then((res) => setAdventure(res.data));
	}, []);
	return (
		<>
			{adventure ? (
                <div>
				<p>{adventure.title}</p>
				<p>{adventure.leader.username}</p>
			</div>
            ) : <p>Loading...</p>}
		</>
	);
}

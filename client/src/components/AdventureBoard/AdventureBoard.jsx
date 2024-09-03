import "./AdventureBoard.css";
import AdventureCard from "../AdventureCard/AdventureCard";
import axios from "axios";
import { useEffect } from "react";
import { useAdventures } from "../../contexts/useAdventures";

export default function AdventureBoard() {
	const { adventures, setAdventures } = useAdventures();

	useEffect(() => {
		if (adventures.length === 0) {
			axios.get("/adventures").then((res) => {
				setAdventures(res.data);
			});
		}
	}, [adventures, setAdventures]);


	/* const [adventures, setAdventures] = useState([]);
	useEffect(()=>{
		axios.get("/adventures").then(res =>{
			setAdventures(res.data);
			console.log("changed");
		})
	},[]) */

	return (
		<div className="adventure-board">
			{adventures.map((adventure, index) => {
				return <AdventureCard key={index} adventure={adventure} />;
			})}
		</div>
	);
}

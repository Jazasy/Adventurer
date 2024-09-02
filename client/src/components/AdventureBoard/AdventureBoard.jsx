import "./AdventureBoard.css";
import AdventureCard from "../AdventureCard/AdventureCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdventureBoard() {
	const [adventures, setAdventures] = useState([]);
	useEffect(()=>{
		axios.get("/adventures").then(res =>{
			setAdventures(res.data);
		})
	},[])
	return (
		<div className="adventure-board">
			{adventures.map((adventure, index) => {
				return <AdventureCard key={index} adventure={adventure} />;
			})}
		</div>
	);
}

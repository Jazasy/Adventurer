import "./AdventureCard.css";
import CardFoot from "./CardFoot";

export default function AdventureCard({ adventure }) {
	return (
		<div className="adventure-card">
			<img src={adventure.images[0]} alt="adventure image" />
			<CardFoot adventure={adventure} />
		</div>
	);
}

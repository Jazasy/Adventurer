import AdventureBoard from "../components/AdventureBoard/AdventureBoard";
import "./Home.css";

export default function Home() {
	return (
		<div className="home-container">
			<h1>Adventurer</h1>
			<section className="main-content">
				<AdventureBoard />
			</section>
			<h1>footer</h1>
		</div>
	);
}

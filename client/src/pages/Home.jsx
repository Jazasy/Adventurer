import AdventureBoard from "../components/AdventureBoard/AdventureBoard";
import "./Home.css";
import HomeHead from "../components/HomeHead/HomeHead";
import Loader from "../components/Loader/Loader";

export default function Home() {
	return (
		<div className="home-container">
			<HomeHead />
			<section className="main-content">
				<AdventureBoard />
			</section>
			<h1>footer</h1>
		</div>
	);
}

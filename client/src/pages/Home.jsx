import AdventureBoard from "../components/AdventureBoard/AdventureBoard";
import "./Home.css";
import HomeHead from "../components/HomeHead/HomeHead";
import Loader from "../components/Loader/Loader";
import HomeFoot from "../components/HomeFoot/HomeFoot";

export default function Home() {
	return (
		<div className="home-container">
			<HomeHead />
			<section className="main-content">
				<AdventureBoard />
			</section>
			<HomeFoot />
		</div>
	);
}

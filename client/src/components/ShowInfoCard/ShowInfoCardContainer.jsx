import AdventurersCard from "../AdventurersCard/AdventurersCard";
import DescriptionCard from "../DescriptionCard/DescriptionCard";
import "./ShowInfoCardContainer.css";
import { useAdventures } from "../../contexts/useAdventures";

export default function ShowInfoCardContainer({ description }) {
	const { showInfo } = useAdventures();

	return (
		<div className="show-info-card-container">
			{showInfo === "description" ? (
				<DescriptionCard description={description} />
			) : (
				<AdventurersCard />
			)}
		</div>
	);
}

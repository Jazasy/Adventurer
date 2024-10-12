import AdventurersCard from "../AdventurersCard/AdventurersCard";
import DescriptionCard from "../DescriptionCard/DescriptionCard";
import "./ShowInfoCardContainer.css";
import { useAdventures } from "../../contexts/useAdventures";
import ApplicantsCard from "../AdventurersCard/ApplicantsCard";

export default function ShowInfoCardContainer({ description }) {
	const { showInfo } = useAdventures();

	return (
		<div className="show-info-card-container">
			{showInfo === "description" ? (
				<DescriptionCard description={description} />
			) : showInfo === "adventurers" ? (
				<AdventurersCard />
			) : (
				<ApplicantsCard />
			)}
		</div>
	);
}

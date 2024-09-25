import DescriptionCard from "../DescriptionCard/DescriptionCard";
import "./ShowInfoCardContainer.css";

export default function ShowInfoCardContainer({ description, members, setVisibility }) {
	return (
		<div className="show-info-card-container">
			<DescriptionCard description={description} setVisibility={setVisibility}/>
		</div>
	);
}

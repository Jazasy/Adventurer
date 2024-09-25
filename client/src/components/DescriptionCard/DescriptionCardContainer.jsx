import "./DescriptionCardContainer.css";
import DescriptionCard from "./DescriptionCard";

export default function DescriptionCardContainer({ description }) {
	return (
		<section className="description-card-container">
			<DescriptionCard description={description} />
		</section>
	);
}

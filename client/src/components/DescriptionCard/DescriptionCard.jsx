import "./DescriptionCard.css";
import { useAdventures } from "../../contexts/useAdventures";

export default function DescriptionCard({ description }) {
    const {setShowInfo} = useAdventures();

    return (
        <div className="description-card">
            <i
                onClick={() => setShowInfo(null)}
				className="fa-solid fa-xmark desc-x"
			></i>
            <h3>About the Adventure</h3>
            <p>{description}</p>
        </div>
    );
}
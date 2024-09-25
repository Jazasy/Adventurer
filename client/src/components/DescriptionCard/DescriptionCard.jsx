import "./DescriptionCard.css";

export default function DescriptionCard({ description, setVisibility }) {
    return (
        <div className="description-card">
            <i
                onClick={setVisibility}
				className="fa-solid fa-xmark desc-x"
			></i>
            <p>{description}</p>
        </div>
    );
}
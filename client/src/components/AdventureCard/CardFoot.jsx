import Button1 from "../Buttons/Button1";
import "./CardFoot.css";
import { useNavigate } from "react-router-dom";
import { useAdventures } from "../../contexts/useAdventures";

export default function CardFoot({ adventure }) {
	const navigate = useNavigate();
	const { selectedAdventure, setSelectedAdventure } = useAdventures();
	const { user } = useAdventures();

	const handleClick = () => {
		setSelectedAdventure(adventure);
		navigate(`/adventures/${adventure._id}`);
	};

	return (
		<div className="card-foot">
			<h3>{adventure.title}</h3>
			{user ? (
				<Button1 text="Apply" action={handleClick} />
			) : (
                <Button1 text="View" action={handleClick} />	
			)}
		</div>
	);
}

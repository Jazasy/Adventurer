import { useAdventures } from "../../contexts/useAdventures";
import "./Adventurer.css";
import { useNavigate } from "react-router-dom";

export default function Adventurer({ adventurer }) {
	const { selectedAdventure } = useAdventures();

	const navigate = useNavigate();

	return (
		<li
			onClick={()=>navigate(`/profiles/${adventurer.user._id}`)}
			className="adventurer"
			key={adventurer.user._id}
		>
			<img
				className="adv-card-pfp"
				src={adventurer.user.pfp}
				alt="profile picture"
			/>
			{adventurer.user.username}
			{selectedAdventure.leader._id === adventurer.user._id ? (
				<i className="fa-solid fa-crown leader-crown"></i>
			) : null}
		</li>
	);
}

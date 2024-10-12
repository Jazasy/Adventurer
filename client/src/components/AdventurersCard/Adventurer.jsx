import { useAdventures } from "../../contexts/useAdventures";
import "./Adventurer.css";
import { useEffect } from "react";

export default function Adventurer({ adventurer }) {
    const { selectedAdventure } = useAdventures();

	return (
		<li className="adventurer" key={adventurer.user._id}>
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

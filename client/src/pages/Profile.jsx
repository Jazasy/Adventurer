import PostBoard from "../components/PostBoard/PostBoard";
import { useAdventures } from "../contexts/useAdventures";
import "./Profile.css";

export default function Profile({ className }) {
	const { user } = useAdventures();
	const userId = user ? user._id : null;

	return (
		<div className={className}>
			<PostBoard userId={userId}/>
		</div>
	);
}

import { useAdventures } from "../contexts/useAdventures";
import "./Profile.css";

export default function Profile() {
	const { user } = useAdventures();

	return (
		<div>
			<h1>Profile</h1>
			{user ? (
				<ul>
					{Object.entries(user).map(([key, value]) => {
						return (
							<li key={key}>
								{key}: {value}
							</li>
						);
					})}
				</ul>
			) : null}
		</div>
	);
}

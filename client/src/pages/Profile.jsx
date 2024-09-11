import { useAdventures } from "../contexts/useAdventures";
import "./Profile.css";
import { useEffect } from "react";
import axios from "axios";

export default function Profile() {
	const { user, setUser } = useAdventures(null);

	useEffect(() => {
        axios.get("/user")
            .then(res => setUser(res.data))
            .catch( err => console.log(err));
	}, [setUser]);

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

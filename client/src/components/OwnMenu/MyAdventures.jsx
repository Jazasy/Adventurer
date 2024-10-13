import OwnMenuOwnAdventure from "./OwnMenuOwnAdventure";

export default function MyAdventures({ applications }) {
	return (
		<div className="my-adventures">
			<p className="own-menu-titles">My Adventures</p>
			{applications.map((application) => (
				<OwnMenuOwnAdventure
					key={application._id}
					adventure={application.adventure}
				/>
			))}
		</div>
	);
}

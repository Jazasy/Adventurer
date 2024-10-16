import Loader from "../Loader/Loader";
import "./MyAcceptedApplications.css";
import OwnMenuItem from "./OwnMenuItem";

export default function MyAcceptedAdventures({ applications }) {
	return (
		<>
			{applications ? (
				applications.length > 0 ? (
					<div className="">
						<p className="own-menu-titles">My Applications</p>
						{applications.map((application) => (
							<OwnMenuItem
								key={application._id}
								adventure={application.adventure}
								accepted={false}
							/>
						))}
					</div>
				) : null
			) : <Loader className="loader" />}
		</>
	);
}

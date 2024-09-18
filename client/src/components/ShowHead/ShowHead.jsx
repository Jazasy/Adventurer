import "./ShowHead.css";

export default function ShowHead({ adventure }) {
	return (
		<header className="show-head">
			<img src={adventure.images[0]} alt="adventure image" />
            <h1>{adventure.title}</h1>
		</header>
	);
}

import AppLogo from "../icons/AppLogo";
import "./Navbar.css";

export default function Navbar() {
	return (
		<div className="navbar">
			<div className="nav-logo"><AppLogo /></div>
			<ul className="nav-items">
				<li className="nav-item">Home</li>
				<li className="nav-item">Sign up</li>
				<li className="nav-item">Login</li>
			</ul>
		</div>
	);
}

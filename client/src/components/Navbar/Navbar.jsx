import AppLogo from "../icons/AppLogo";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
	const navigate = useNavigate();
	const currentPath = useLocation().pathname;
	const handleClick = (event) => {
		const path = event.target.getAttribute("path");
		navigate(`/${path}`);
	};
	return (
		<div className="navbar">
			<div className="nav-logo">
				<AppLogo />
			</div>
			<ul className="nav-items">
				<li
					className={currentPath === "/home" ? "nav-item selected" : "nav-item"}
					onClick={handleClick}
					path="home"
				>
					Home
				</li>
				<li
					className={currentPath === "/register" ? "nav-item selected" : "nav-item"}
					onClick={handleClick}
					path="register"
				>
					Sign up
				</li>
				<li
					className={currentPath === "/login" ? "nav-item selected" : "nav-item"}
					onClick={handleClick}
					path="login"
				>
					Login
				</li>
			</ul>
		</div>
	);
}

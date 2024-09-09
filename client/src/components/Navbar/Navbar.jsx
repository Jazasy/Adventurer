import AppLogo from "../icons/AppLogo";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();
	const currentPath = useLocation().pathname;
	const handleClick = (event) => {
		const path = event.target.getAttribute("path");
		navigate(`/${path}`);
		setIsMenuOpen(false);
	};
	const handleMenuClick = () => {
		setIsMenuOpen((oldIsMenuOpen) => !oldIsMenuOpen);
	};
	return (
		<div className="navbar">
			<div className="nav-head">
				<div className="nav-logo" onClick={() => navigate("/home")}>
					<AppLogo />
				</div>
				<i className="fa-solid fa-bars" onClick={handleMenuClick}></i>
			</div>
			<ul className={isMenuOpen ? "nav-items nav-items-open" : "nav-items"}>
				<li
					className={currentPath === "/home" ? "nav-item selected" : "nav-item"}
					onClick={handleClick}
					path="home"
				>
					Home
				</li>
				<li
					className={
						currentPath === "/register" ? "nav-item selected" : "nav-item"
					}
					onClick={handleClick}
					path="register"
				>
					Sign up
				</li>
				<li
					className={
						currentPath === "/login" ? "nav-item selected" : "nav-item"
					}
					onClick={handleClick}
					path="login"
				>
					Login
				</li>
			</ul>
		</div>
	);
}

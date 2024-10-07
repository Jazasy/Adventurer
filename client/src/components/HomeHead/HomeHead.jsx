import Button1 from "../Buttons/Button1";
import "./HomeHead.css";
import { useNavigate } from "react-router-dom";
import { useAdventures } from "../../contexts/useAdventures";
import { useState } from "react";
import CreateWindow from "./CreateWindow";

export default function HomeHead() {
	const { user } = useAdventures();
	const [ showCreateWindow, setShowCreateWindow ] = useState(false);

	const navigate = useNavigate();

	const handleSignUpClick = () => {
		navigate("/register");
	};

	return (
		<header className="home-head">
			<h1 className="home-title">Your Jurney begins here!</h1>
			{user ? (
				<>
					<p className="home-paragraph">
						Take a look at others adventures. You can follow and apply to them. If you want, you can even
					</p>
					<Button1 text="Create your own!" action={()=>setShowCreateWindow(true)}/>
					{showCreateWindow ? <CreateWindow closeCreateWindow={()=>setShowCreateWindow(false)} /> : null}
				</>
			) : (
				<>
					<p className="home-paragraph">
						Take a look at others jurney. If you want to apply something like
						them
					</p>
					<Button1 text="Sign up now!" action={handleSignUpClick} />
				</>
			)}
		</header>
	);
}

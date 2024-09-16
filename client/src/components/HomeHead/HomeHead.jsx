import Button1 from "../Buttons/Button1";
import "./HomeHead.css";
import { useNavigate } from "react-router-dom";

export default function HomeHead() {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate("/register");
    }

    return (
        <header className="home-head">
            <h1 className="home-title">Your Adventure begins here!</h1>
			<p className="home-paragraph">
				Take a look at others jurney. If you want to apply something like them
			</p>
            <Button1 text="Sign up now!" action={handleSignUpClick}/>
        </header>
    )
}
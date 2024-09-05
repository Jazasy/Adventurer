import "./LoginCard.css";
import LoginForm from "./LoginForm";

export default function LoginCard() {
    return (
        <section className="login-card">
			<h1>Log in to your account!</h1>
			<LoginForm />
		</section>
    )
}
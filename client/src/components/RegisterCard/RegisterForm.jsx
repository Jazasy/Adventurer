import "./RegisterForm.css";
import TextInput from "../inputs/TextInput";
import PassInput from "../inputs/PassInput";
import Button1 from "../Buttons/Button1";

export default function RegisterForm() {
    return (
        <form className="register-form">
            <TextInput />
			<TextInput />
			<section className="passwords">
				<PassInput />
                <PassInput />
			</section>
            <Button1 className="login-button btn-fit-content btn-big" text="Sign up"/>
        </form>
    )
}
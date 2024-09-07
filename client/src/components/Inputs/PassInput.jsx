import "./TextInput.css";
import "./PassInput.css";
import { useRef, useState } from "react";

export default function PassInput({ value, handleChange, name, placeholder }) {
	const [show, setShow] = useState(false);
    const passInputRef = useRef(null);

	const toggleShow = (event) => {
        event.preventDefault();
        const length = passInputRef.current.value.length;
        setShow((oldShow) => !oldShow);
        setTimeout(() => {
            passInputRef.current.focus();
            passInputRef.current.setSelectionRange(length, length);
        }, 0);
		
	};

	return (
		<div className="pass-input-container">
			<input
				className="input pass-input"
				type={`${show ? "text" : "password"}`}
				value={value}
				onChange={handleChange}
				name={name}
				placeholder={placeholder}
                ref={passInputRef}
			/>
			{show ? (
				<i className="fa-regular fa-eye-slash" onMouseDown={toggleShow}></i>
			) : (
				<i className="fa-regular fa-eye" onMouseDown={toggleShow}></i>
			)}
		</div>
	);
}

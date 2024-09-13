import "./TextInput.css";

export default function TextInput({ value, handleChange, name, placeholder }) {
	return (
		<input
			className="input text-input"
			type="text"
			value={value}
			onChange={handleChange}
			name={name}
			placeholder={placeholder}
		/>
	);
}

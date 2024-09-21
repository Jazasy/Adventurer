import "./TextInput.css";

export default function TextInput({className, value, handleChange, name, placeholder }) {
	return (
		<input
			className={`input text-input ${className}`}
			type="text"
			value={value}
			onChange={handleChange}
			name={name}
			placeholder={placeholder}
		/>
	);
}

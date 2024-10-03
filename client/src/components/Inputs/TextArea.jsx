import "./TextInput.css";
import "./TextArea.css";

export default function TextInput({className, value, handleChange, name, placeholder, rows }) {
	return (
		<textarea
			className={`input text-input text-area ${className}`}
			rows={rows}
			type="text"
			value={value}
			onChange={handleChange}
			name={name}
			placeholder={placeholder}
		/>
	);
}

import "./MessageForm.css";
import { useState, useEffect } from "react";
import TextArea from "../inputs/TextArea";
import Button1 from "../Buttons/Button1";

export default function MessageForm({ socket, adventureId, user }) {
	const [message, setMessage] = useState("");

	const handleKeyDown = (event) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			sendMessage(event);
		}
	};

	const sendMessage = (event) => {
		event.preventDefault();
		if (message.trim()) {
			socket.emit("send_message", {
				content: message,
				adventureId,
				userId: user._id,
				username: user.username,
				pfp: user.pfp,
			});
			setMessage("");
		}
	};

	return (
		<form onSubmit={sendMessage} className="message-form">
			<TextArea
				className="text-area-messages"
				rows="1"
				type="text"
				name="messageIntpu"
				id="messageInput"
				value={message}
				handleChange={(event) => setMessage(event.target.value)}
				handleKeyDown={handleKeyDown}
			/>
			<Button1 action={sendMessage} text="send" className="btn-fit-content" />
		</form>
	);
}

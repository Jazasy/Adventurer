import "./MessageForm.css";
import { useState } from "react";
import TextArea from "../inputs/TextArea";
import Button1 from "../Buttons/Button1";
import axios from "axios";
import { resInfoError } from "../ResponseInfo/resInfoHelpers";
import { useAdventures } from "../../contexts/useAdventures";

export default function MessageForm({ socket, adventureId, user }) {
	const { setResInfos } = useAdventures();
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

			axios
				.post(`/messages/${adventureId}`, { content: message })
				.catch((error) => {
					error.response.data.message &&
						resInfoError(error.response.data.message, setResInfos);
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

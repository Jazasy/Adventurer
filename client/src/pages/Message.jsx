import "./Message.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useAdventures } from "../contexts/useAdventures";
import axios from "axios";
import { resInfoError } from "../components/ResponseInfo/resInfoHelpers";

export default function Message({ adventureId, className }) {
	const { user } = useAdventures();
	const { setResInfos } = useAdventures();
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	const socket = io.connect(import.meta.env.VITE_SERVER_URL);

	const joinRoom = () => {
		adventureId && socket.emit("join_room", adventureId);
	};

	const sendMessage = (event) => {
		event.preventDefault();
		axios
			.post(`/messages/${adventureId}`, { content: message })
			.catch((error) => {
				error.response.data.message &&
					resInfoError(error.response.data.message, setResInfos);
			});
		socket.emit("send_message", {
			content: message,
			adventureId,
			userId: user._id,
		});
		setMessage("");
	};

	const handleChange = (event) => {
		setMessage(event.target.value);
	};

	useEffect(() => {
		console.log("initial useEffect in Message.jsx");
		axios
			.get(`/messages/${adventureId}`)
			.then((res) => setMessages(res.data))
			.catch((error) => {
				error.response.data.message &&
					resInfoError(error.response.data.message, setResInfos);
			});
		joinRoom();
	}, [adventureId, setResInfos, user._id, user]);

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessages((oldMessages) => [...oldMessages, data]);
		});
	}, [socket]);

	return (
		<main className={`message-container ${className}`}>
			<ul>
				{messages.map((message, index) => (
					<li key={index}>{message.content}</li>
				))}
			</ul>
			<form onSubmit={sendMessage}>
				<input
					type="text"
					name="messageIntpu"
					id="messageInput"
					value={message}
					onChange={handleChange}
				/>
				<button>Send</button>
			</form>
		</main>
	);
}

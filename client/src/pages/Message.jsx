import "./Message.css";
import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { useAdventures } from "../contexts/useAdventures";
import axios from "axios";
import { resInfoError } from "../components/ResponseInfo/resInfoHelpers";
import Adventurer from "../components/AdventurersCard/Adventurer";
import TextArea from "../components/inputs/TextArea";
import Button1 from "../components/Buttons/Button1";
import MessageForm from "../components/MessageForm/MessageForm";

const socket = io.connect(import.meta.env.VITE_SERVER_URL);

export default function Message({ adventureId, className }) {
	const { user } = useAdventures();
	const { setResInfos } = useAdventures();
	const { selectedAdventure } = useAdventures();
	const [messages, setMessages] = useState([]);
	const messageContainerRef = useRef(null);

	!adventureId && (adventureId = selectedAdventure._id);

	useEffect(() => {
		setMessages([]);

		const navbar = document.querySelector(".navbar");
		messageContainerRef.current.style.height = `calc(100vh - ${navbar.clientHeight}px)`;

		adventureId && socket.emit("join_room", adventureId);

		socket.on("receive_message", (data) => {
			console.log(data);
			setMessages((oldMessages) => [...oldMessages, data]);
		});

		return () => {
			socket.off("receive_message");
		};
	}, [adventureId]);

	return (
		<main
			className={`message-container ${className}`}
			ref={messageContainerRef}
		>
			<h1>{selectedAdventure.title}</h1>
			<ul>
				{messages.map((message, index) => (
					<li key={index}>
						<span>{message.username}</span>
						{message.content}
					</li>
				))}
			</ul>
			<MessageForm socket={socket} adventureId={adventureId} user={user} />
		</main>
	);
}

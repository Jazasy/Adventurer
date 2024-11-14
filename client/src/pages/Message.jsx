import "./Message.css";
import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { useAdventures } from "../contexts/useAdventures";
import axios from "axios";
import { resInfoError } from "../components/ResponseInfo/resInfoHelpers";
import MessageForm from "../components/MessageForm/MessageForm";
import Messages from "../components/MessageForm/Messages";
import MessageHead from "../components/MessageHead/MessageHead";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const socket = io(import.meta.env.VITE_SERVER_URL, {withCredentials: true});

export default function Message({ adventureId, className }) {
	const { user } = useAdventures();
	const { setResInfos } = useAdventures();
	const [adventure, setAdventure] = useState(null);
	const [messages, setMessages] = useState(null);
	const prevAdventureIdRef = useRef();

	const messageContainerRef = useRef(null);

	const { id } = useParams();
	!adventureId && (adventureId = id);

	useEffect(() => {
		setAdventure(null);
		axios
			.get(`/adventures/${adventureId}`)
			.then((res) => {
				setAdventure(res.data);
			})
			.catch((error) => {
				error.response.data.message &&
					resInfoError(error.response.data.message, setResInfos);
			});
	}, [adventureId, setAdventure, setResInfos]);

	useEffect(() => {
		setMessages([]);

		adventureId &&
			axios
				.get(`/messages/${adventureId}`)
				.then((res) => {
					setMessages(res.data);
				})
				.catch((error) => {
					error.response.data.message &&
						resInfoError(error.response.data.message, setResInfos);
				});

		const navbar = document.querySelector(".navbar");
		messageContainerRef.current.style.height = `calc(100vh - ${navbar.clientHeight}px)`;

		if (prevAdventureIdRef.current) {
			socket.emit("leave_room", prevAdventureIdRef.current);
		}

		if (adventureId) {
			socket.emit("join_room", adventureId);
			prevAdventureIdRef.current = adventureId;
		}

		socket.on("receive_message", (data) => {
			setMessages((oldMessages) => [...oldMessages, data]);
		});

		return () => {
			socket.off("receive_message");
		};
	}, [adventureId, setResInfos]);

	return (
		<main
			className={`message-container ${className}`}
			ref={messageContainerRef}
		>
			{adventure ? (
				<MessageHead title={adventure.title} />
			) : (
				<Loader className="loader-smaller" />
			)}
			{user && messages ? (
				<Messages messages={messages} />
			) : (
				<Loader className="loader-big" />
			)}
			<MessageForm socket={socket} adventureId={adventureId} user={user} />
		</main>
	);
}

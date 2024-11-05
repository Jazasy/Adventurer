import { useEffect, useRef } from "react";
import "./Messages.css";
import { useAdventures } from "../../contexts/useAdventures";

export default function Messages({ messages }) {
	const { user } = useAdventures();

	const messagesRef = useRef(null);

	const formatMessageContent = (content) => {
		console.log(content.split("\n"));
		return content.split("\n").map((line, index) => (
			<span key={index}>
				{line}
				<br />
			</span>
		));
	};

	useEffect(() => {
		if (messagesRef.current) {
			messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<ul className="messages" ref={messagesRef}>
			{messages.map((message, index) => (
				<li
					className={`message ${
						message.user._id === user._id ? "message-own" : ""
					}`}
					key={index}
				>
					<img className="message-pfp" src={message.user.pfp} alt="user pfp" />
					<div className="message-text">
						<p
							className={`message-name ${
								message.user._id === user._id ? "message-name-own" : ""
							}`}
						>
							{message.user.username}
						</p>
						<p
							className={`message-content ${
								message.user._id === user._id ? "message-content-own" : ""
							}`}
						>
							{formatMessageContent(message.content)}
						</p>
					</div>
				</li>
			))}
		</ul>
	);
}

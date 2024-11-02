import { useEffect, useRef } from "react";
import "./Messages.css";

export default function Messages({ messages }) {
	const messagesRef = useRef(null);

	useEffect(() => {
		if (messagesRef.current) {
			messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<ul className="messages" ref={messagesRef}>
			{messages.map((message, index) => (
				<li key={index}>
					<span style={{ marginRight: "1rem" }}>{message.user.username}</span>
					{message.content}
				</li>
			))}
		</ul>
	);
}

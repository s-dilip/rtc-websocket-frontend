import { useState } from "react";
import useWebSocket from "react-use-websocket";
import MessageList from "./MessageList";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [user, setUser] = useState("");
  const [showUserField, setShowUserField] = useState(true);

  const { sendJsonMessage } = useWebSocket("ws://localhost:8080", {
    onOpen: () => {
      console.log("Websocket Connection Established!");
    },
    onMessage: (message) => {
      console.log(message);
      setMessages([...messages, message.data]);
    },
  });

  function handleSendMessage() {
    sendJsonMessage(messageText);
  }

  function handleMessageEntry(e) {
    setMessageText(e.target.value);
  }

  function handleUserNameEntry(e) {
    setUser(e.target.value);
  }

  return (
    <div>
      <h1>ChatRoom</h1>
      {showUserField ? (
        <div>
          <h3>Please choose your Username!</h3>
          <input onChange={handleUserNameEntry}></input>
          <br />
          <button
            onClick={() => {
              setShowUserField(false);
            }}
          >
            Login!
          </button>
        </div>
      ) : (
        <div>
          <h3>Welcome! {user}</h3>
          <MessageList messages={messages} />
          <input onChange={handleMessageEntry}></input> <br />
          <button onClick={handleSendMessage}>Send!</button>
        </div>
      )}
    </div>
  );
}

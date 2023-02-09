import { useState } from "react";
import useWebSocket from "react-use-websocket";
import MessageList from "./MessageList";
import TypingList from "./TypingList";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [user, setUser] = useState("");
  const [showUserField, setShowUserField] = useState(true);
  const [userTyping, setUserTyping] = useState("");

  const { sendJsonMessage } = useWebSocket(
    // "wss://rtc-websocket-backend-production.up.railway.app",
    "ws://localhost:8080",
    {
      onOpen: () => {
        console.log("Websocket Connection Established!");
      },
      onMessage: (message) => {
        console.log(JSON.parse(message.data));
        let messageRecieved = JSON.parse(message.data);

        if (messageRecieved.type === "content") {
          const message = {
            sender: messageRecieved.sender,
            content: messageRecieved.content,
          };
          setMessages([...messages, message]);
        } else {
          setUserTyping(messageRecieved.content);

          setTimeout(() => {
            setUserTyping("");
          }, 2000);
        }
      },
    }
  );

  function handleSendMessage() {
    sendJsonMessage({ type: "content", sender: user, content: messageText });
  }

  function handleMessageEntry(e) {
    setMessageText(e.target.value);
    // sendJsonMessage({ type: "typing", content: user + " is typing..." });
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
          <TypingList typist={userTyping} />
          <MessageList messages={messages} />
          <input onChange={handleMessageEntry}></input> <br />
          <button onClick={handleSendMessage}>Send!</button>
        </div>
      )}
    </div>
  );
}

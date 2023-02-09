export default function MessageList(props) {
  return (
    <div>
      <h3>Messages</h3>
      {props.messages.map((message, i) => {
        return (
          <div>
            <h3 key={i}>{message.sender}</h3>
            <p>{message.content}</p>
          </div>
        );
      })}
    </div>
  );
}

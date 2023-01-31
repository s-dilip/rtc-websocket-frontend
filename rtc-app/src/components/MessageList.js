export default function MessageList(props) {
  return (
    <div>
      <h3>Messages</h3>
      {props.messages.map((message, i) => {
        return <p key={i}>{message}</p>;
      })}
    </div>
  );
}

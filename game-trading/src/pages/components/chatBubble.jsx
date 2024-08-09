function ChatBubble({ message, sender }) {
    return (
      <div className={`chat-bubble ${sender}`}>
        <p>{message}</p>
      </div>
    );
  }
  
  export default ChatBubble;
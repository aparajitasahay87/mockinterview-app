import React from "react";

function ChatBox({ input, setInput }) {
  return (
    <textarea
      placeholder="Type your TPM interview answer..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      rows={8}
      cols={80}
    />
  );
}

export default ChatBox;
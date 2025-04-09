import React from "react";
import { ChatWidgetProps } from "../types";
import { useChat } from "../hooks/useChat";

const ChatWidget: React.FC<ChatWidgetProps> = ({
  apiKey,
  initialMessage,
  className,
  style,
}) => {
  const { messages, inputValue, isLoading, error, setInputValue, sendMessage } =
    useChat({ apiKey, initialMessage });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(inputValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className={`doctalkie-chat-widget ${className || ""}`} style={style}>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isUser ? "user" : "ai"}`}>
            {msg.text}
            {msg.timestamp && (
              <span className="timestamp">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            )}
          </div>
        ))}
        {isLoading && <div className="loading">Загрузка...</div>}
        {error && <div className="error">{error}</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Введите ваш вопрос..."
          disabled={isLoading}
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
          Отправить
        </button>
      </div>

      <style jsx>{`
        .doctalkie-chat-widget {
          border: 1px solid #ccc;
          border-radius: 5px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 300px; /* Пример высоты */
          width: 300px; /* Пример ширины */
        }

        .chat-messages {
          flex-grow: 1;
          padding: 10px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .message {
          padding: 8px 12px;
          margin-bottom: 5px;
          border-radius: 5px;
          word-break: break-word;
          font-size: 0.9rem;
        }

        .message.user {
          background-color: #e0f7fa;
          align-self: flex-end;
        }

        .message.ai {
          background-color: #f0f0f0;
          align-self: flex-start;
        }

        .timestamp {
          display: block;
          font-size: 0.7rem;
          color: #777;
          margin-top: 3px;
        }

        .loading,
        .error {
          padding: 8px;
          text-align: center;
          font-style: italic;
          color: #555;
        }

        .error {
          color: red;
        }

        .chat-input {
          display: flex;
          padding: 10px;
          border-top: 1px solid #eee;
        }

        .chat-input input {
          flex-grow: 1;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 3px 0 0 3px;
          outline: none;
        }

        .chat-input button {
          padding: 8px 15px;
          border: 1px solid #ccc;
          border-radius: 0 3px 3px 0;
          background-color: #007bff;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .chat-input button:hover {
          background-color: #0056b3;
        }

        .chat-input button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default ChatWidget;

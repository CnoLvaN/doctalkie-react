import { useState, useCallback } from "react";
import { ChatMessage } from "./types";

interface UseChatOptions {
  apiKey: string;
  initialMessage?: string;
}

interface UseChatResult {
  messages: ChatMessage[];
  inputValue: string;
  isLoading: boolean;
  error: string | null;
  setInputValue: (value: string) => void;
  sendMessage: (message: string) => Promise<void>;
}

export const useChat = ({
  apiKey,
  initialMessage,
}: UseChatOptions): UseChatResult => {
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessage ? [{ text: initialMessage, isUser: false }] : []
  );
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) {
        return;
      }

      const newUserMessage: ChatMessage = {
        text: message,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setInputValue("");
      setIsLoading(true);
      setError(null);

      console.log("Сообщение отправлено:", message, "API Key:", apiKey);
      const aiResponseMessage: ChatMessage = {
        text: "Ответ от ИИ (заглушка)",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, aiResponseMessage]);
      setIsLoading(false);

      // try {
      //   const response = await fetch('/api/doctalkie', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${apiKey}`,
      //     },
      //     body: JSON.stringify({ message }),
      //   });

      //   if (!response.ok) {
      //     const errorData = await response.json();
      //     throw new Error(errorData?.error || `Error: ${response.status}`);
      //   }

      //   const data = await response.json();
      //   const aiResponseMessage: ChatMessage = { text: data.response, isUser: false, timestamp: new Date() };
      //   setMessages((prevMessages) => [...prevMessages, aiResponseMessage]);
      // } catch (err: any) {
      //   setError(err.message);
      //   const errorMessage: ChatMessage = { text: `Error: ${err.message}`, isUser: false, timestamp: new Date() };
      //   setMessages((prevMessages) => [...prevMessages, errorMessage]);
      // } finally {
      //   setIsLoading(false);
      // }
    },
    [apiKey]
  );

  return {
    messages,
    inputValue,
    isLoading,
    error,
    setInputValue,
    sendMessage,
  };
};

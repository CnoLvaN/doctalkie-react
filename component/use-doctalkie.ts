import { useState, useCallback } from "react";
import type { Message, UseDocTalkieProps } from "../types";

// Определяем и экспортируем кастомный хук
export function useDocTalkie({
  apiURL,
  apiKey,
  initialMessages,
}: UseDocTalkieProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Переименованная и адаптированная функция отправки сообщения
  const sendMessage = useCallback(
    async (userMessageContent: string) => {
      if (!userMessageContent.trim() || isLoading) return;

      setError(null); // Сбрасываем ошибку при новой отправке

      const userMessage: Message = {
        id: crypto.randomUUID(),
        content: userMessageContent,
        sender: "user",
        timestamp: new Date(),
      };
      const assistantPlaceholderId = crypto.randomUUID();
      const assistantPlaceholder: Message = {
        id: assistantPlaceholderId,
        content: "",
        sender: "assistant",
        timestamp: new Date(),
        isLoading: true,
      };

      // Оптимистичное обновление UI
      setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
      setIsLoading(true);

      // --- УДАЛЕНО: Извлечение ID и формирование URL ---
      // Хук должен использовать предоставленный apiURL напрямую
      // --- Конец удаления ---

      try {
        // Используем переданный apiURL напрямую
        const response = await fetch(apiURL, {
          // <-- ИСПОЛЬЗУЕМ apiURL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ query: userMessageContent }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            `API request failed: ${response.status} ${response.statusText} - ${
              errorData?.error || "Unknown error"
            }`
          );
        }

        const data = await response.json();
        const assistantResponse =
          data.answer || "Sorry, I couldn't get a response.";

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantPlaceholderId
              ? { ...msg, content: assistantResponse, isLoading: false }
              : msg
          )
        );
      } catch (fetchError) {
        console.error("Error sending message:", fetchError);
        const errorMessage = `Error: ${
          fetchError instanceof Error ? fetchError.message : "Failed to fetch"
        }`;
        setError(errorMessage);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantPlaceholderId
              ? { ...msg, content: errorMessage, isLoading: false }
              : msg
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [apiURL, apiKey, isLoading]
  ); // Зависимости useCallback

  return { messages, isLoading, error, sendMessage };
}

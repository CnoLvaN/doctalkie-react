// Тип для сообщений чата
export type Message = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  isLoading?: boolean;
};

// Интерфейс для пропсов хука useDocTalkie
export interface UseDocTalkieProps {
  apiURL: string;
  apiKey: string;
  initialMessages: Message[];
}

// Интерфейс для пропсов компонента DocTalkieChat
export interface DocTalkieChatProps {
  apiURL: string;
  apiKey: string;
  theme?: "dark" | "light" | "doctalkie";
  accentColor?: string;
  position?: "bottom-right" | "bottom-left";
  welcomeMessage?: string;
  className?: string; // Keep className for root container customization
}

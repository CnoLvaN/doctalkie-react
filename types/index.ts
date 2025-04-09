export interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp?: Date;
}

export interface ChatWidgetProps {
  apiKey: string;
  initialMessage?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface ChatState {
  messages: ChatMessage[];
  inputValue: string;
  isLoading: boolean;
  error: string | null;
}

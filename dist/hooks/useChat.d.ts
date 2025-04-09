import { ChatMessage } from "../types";
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
export declare const useChat: ({ apiKey, initialMessage, }: UseChatOptions) => UseChatResult;
export {};

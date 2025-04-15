"use client";

import React from "react";
import { useState, useRef, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useDocTalkie } from "./use-doctalkie";
import type { Message, DocTalkieChatProps } from "../types";
import "component/doc-talkie-chat.css";

// Define SVG Icons directly in the component
const IconMessageCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);

const IconX = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const IconSend = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const IconLoader = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// --- Style Definitions ---

const BASE_FONT_SIZE = "14px";
const BORDER_RADIUS = "0.375rem"; // rounded-md
const BORDER_RADIUS_FULL = "9999px"; // rounded-full
const SHADOW_LG =
  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";

// Define Color Palettes (Replace Tailwind CSS variables)
const colors = {
  light: {
    background: "#ffffff", // bg-white
    border: "#e5e7eb", // border-neutral-200
    text: "#111827", // text-black
    textMuted: "#6b7280", // text-neutral-500
    placeholder: "#6b7280", // placeholder:text-neutral-500
    headerBg: "#f3f4f6", // bg-neutral-100
    userMsgBg: "#1f2937", // bg-neutral-900
    userMsgText: "#ffffff", // text-white
    assistantMsgBg: "#e5e7eb", // bg-neutral-200
    assistantMsgText: "#1f2937", // text-neutral-900
    inputBg: "#f3f4f6", // bg-neutral-100
    ring: "#111827", // focus-visible:ring-black
    buttonText: "#ffffff", // text-white
    buttonBg: "#1f2937", // bg-neutral-900
    buttonHoverBg: "#374151", // hover:bg-neutral-700
    closeIcon: "#4b5563", // text-neutral-600
    closeIconHover: "#111827", // hover:text-neutral-900
    toggleOpenBg: "#e5e7eb", // bg-neutral-200
    toggleOpenText: "#374151", // text-neutral-700
    toggleOpenHoverBg: "#d1d5db", // hover:bg-neutral-300
    loader: "#6b7280", // text-neutral-500
    codeBg: "#f3f4f6", // prose-pre:bg-neutral-100
  },
  dark: {
    background: "#0a0a0a", // bg-neutral-950
    border: "#262626", // border-neutral-800
    text: "#ffffff", // text-white
    textMuted: "#a3a3a3", // text-neutral-400
    placeholder: "#a3a3a3", // placeholder:text-neutral-400
    headerBg: "#171717", // bg-neutral-900
    userMsgBg: "#ffffff", // bg-white
    userMsgText: "#000000", // text-black
    assistantMsgBg: "#262626", // bg-secondary (assuming secondary is neutral-800)
    assistantMsgText: "#fafafa", // text-secondary-foreground (assuming this is neutral-50)
    inputBg: "#262626", // bg-neutral-800
    ring: "#ffffff", // focus-visible:ring-white
    buttonText: "#000000", // text-black
    buttonBg: "#ffffff", // bg-white
    buttonHoverBg: "#e5e7eb", // hover:bg-neutral-200
    closeIcon: "#a3a3a3", // text-neutral-400
    closeIconHover: "#ffffff", // hover:text-white
    toggleOpenBg: "#262626", // bg-secondary
    toggleOpenText: "#fafafa", // text-secondary-foreground
    toggleOpenHoverBg: "rgba(38, 38, 38, 0.8)", // hover:bg-secondary/80
    loader: "#a3a3a3", // text-neutral-400
    codeBg: "#262626", // dark:prose-pre:bg-neutral-800
  },
  // Define a 'doctalkie' theme - using detected primary and background colors
  doctalkie: {
    background: "hsl(222, 47%, 11%)", // ** USING DETECTED --background **
    border: "hsl(217, 32%, 17%)", // Use --muted for border
    text: "#ffffff", // White text on dark background
    textMuted: "#a3a3a3", // Keep light grey for muted text
    placeholder: "hsl(217, 32%, 35%)", // Slightly lighter muted for placeholder
    headerBg: "hsl(217, 32%, 17%)", // ** USING DETECTED --muted ** for header
    userMsgBg: "hsl(175, 100%, 45%)", // Using detected --primary (Cyan)
    userMsgText: "#ffffff", // White text on primary
    assistantMsgBg: "hsl(222, 47%, 13%)", // ** USING DETECTED --card ** for assistant messages
    assistantMsgText: "#fafafa", // Light text for assistant messages
    inputBg: "hsl(217, 32%, 17%)", // ** USING DETECTED --muted ** for input
    ring: "hsl(175, 100%, 45%)", // Using detected --primary (Cyan) for focus ring
    buttonText: "#ffffff", // White text on primary button
    buttonBg: "hsl(175, 100%, 45%)", // Using detected --primary (Cyan) for button
    buttonHoverBg: "hsl(175, 100%, 40%)", // Darker cyan on hover
    closeIcon: "#a3a3a3", // Light grey for close icon
    closeIconHover: "#ffffff", // White on hover
    toggleOpenBg: "hsl(222, 47%, 13%)", // ** USING DETECTED --card ** for open toggle button
    toggleOpenText: "#fafafa", // Light text for open toggle icon
    toggleOpenHoverBg: "hsl(222, 47%, 16%)", // Slightly darker card on hover
    loader: "#a3a3a3", // Light grey for loader
    codeBg: "hsl(222, 47%, 13%)", // ** USING DETECTED --card ** for code background
  },
};

export default function DocTalkieChat({
  apiURL,
  apiKey,
  theme = "dark",
  accentColor,
  position = "bottom-right",
  welcomeMessage = "Hi there! How can I help you today?",
  className, // Passed to the root div
}: DocTalkieChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [botName, setBotName] = useState<string>("DocTalkie Assistant");
  const [isNameLoading, setIsNameLoading] = useState<boolean>(true);
  const [nameFetchError, setNameFetchError] = useState<boolean>(false);

  const {
    messages,
    isLoading,
    error: messageSendError,
    sendMessage,
  } = useDocTalkie({
    apiURL,
    apiKey,
    initialMessages: [
      {
        id: "initial-welcome",
        content: welcomeMessage,
        sender: "assistant",
        timestamp: new Date(),
      },
    ],
  });

  const currentTheme = colors[theme] || colors.doctalkie; // Fallback to doctalkie

  const toggleChat = () => {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => setIsRendered(false), 300);
    } else {
      setIsRendered(true);
      setTimeout(() => setIsOpen(true), 10);
    }
  };

  const handleTriggerSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleTriggerSend();
    }
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  useEffect(() => {
    const fetchBotName = async () => {
      setIsNameLoading(true);
      setNameFetchError(false);
      const nameUrl = `${apiURL.replace(/\/?$/, "")}/getName`;
      try {
        const response = await fetch(nameUrl);
        if (!response.ok) {
          console.warn(`Failed to fetch bot name: ${response.status}`);
          setBotName("DocTalkie Assistant");
          setNameFetchError(true);
          return;
        }
        const data = await response.json();
        if (data.name) {
          setBotName(data.name);
          setNameFetchError(false);
        } else {
          console.warn("Bot name not found in API response.");
          setBotName("DocTalkie Assistant");
          setNameFetchError(true);
        }
      } catch (err) {
        console.error("Error fetching bot name:", err);
        setBotName("DocTalkie Assistant");
        setNameFetchError(true);
      } finally {
        setIsNameLoading(false);
      }
    };

    fetchBotName();
  }, [apiURL]);

  // --- Base Style Objects (minimal changes, remove things handled by CSS) ---
  const rootStyleBase: React.CSSProperties = {
    position: "fixed",
    zIndex: 50,
    ...(position === "bottom-right"
      ? { bottom: "1.5rem", right: "1.5rem" }
      : { bottom: "1.5rem", left: "1.5rem" }),
  };
  const chatCardBaseStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "4rem", // bottom-16 equivalent if toggle button is h-12 + bottom-6 padding = 4rem
    width: "384px", // w-96
    height: "600px",
    boxShadow: SHADOW_LG,
    borderWidth: "1px",
    borderStyle: "solid",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transitionProperty: "all",
    transitionDuration: "300ms",
    transitionTimingFunction: "ease-out",
    ...(position === "bottom-right" ? { right: "0" } : { left: "0" }),
  };
  const chatCardThemeStyle: React.CSSProperties = {
    backgroundColor: currentTheme.background,
    borderColor: currentTheme.border,
    color: currentTheme.text,
  };
  const chatCardAnimationStyle: React.CSSProperties = isOpen
    ? { opacity: 1, transform: "scale(1) translateY(0)" }
    : { opacity: 0, transform: "scale(0.95) translateY(1rem)" }; // scale-95 translate-y-4
  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem", // p-3
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    backgroundColor: currentTheme.headerBg,
    borderBottomColor: currentTheme.border,
  };
  const indicatorBaseStyle: React.CSSProperties = {
    height: "0.5rem",
    width: "0.5rem",
    borderRadius: BORDER_RADIUS_FULL,
    marginRight: "0.5rem",
    // Animation handled by CSS class
  };
  const headerTextStyle: React.CSSProperties = {
    fontWeight: 500, // font-medium
    color: currentTheme.text,
  };
  const closeButtonStyle: React.CSSProperties = {
    height: "2rem",
    width: "2rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDER_RADIUS,
    color: currentTheme.closeIcon,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "color 0.2s ease-out", // Add transition for hover color
  };
  const messagesContainerStyle: React.CSSProperties = {
    flex: "1 1 0%",
    overflowY: "auto",
    padding: "0.75rem", // p-3
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem", // gap-3
  };
  const errorStyle: React.CSSProperties = {
    padding: "0.5rem", // p-2
    marginBottom: "0.5rem", // mb-2
    fontSize: "0.75rem", // text-xs
    textAlign: "center",
    color: "#b91c1c", // text-red-700
    backgroundColor: "#fee2e2", // bg-red-100
    borderRadius: BORDER_RADIUS,
    border: "1px solid #fecaca", // border-red-300
  };
  const getMessageStyle = (
    sender: "user" | "assistant"
  ): React.CSSProperties => {
    const isUser = sender === "user";
    const userBg = accentColor ? accentColor : currentTheme.userMsgBg;
    const userText = accentColor ? "#ffffff" : currentTheme.userMsgText; // Assume white text on accent color
    const assistantBg = currentTheme.assistantMsgBg;
    const assistantText = currentTheme.assistantMsgText;

    return {
      maxWidth: "80%",
      borderRadius: BORDER_RADIUS, // rounded-lg
      padding: "0.75rem", // p-3
      fontSize: BASE_FONT_SIZE, // text-sm
      position: "relative",
      overflowWrap: "break-word", // break-words equivalent
      alignSelf: isUser ? "flex-end" : "flex-start", // ml-auto equivalent
      backgroundColor: isUser ? userBg : assistantBg,
      color: isUser ? userText : assistantText,
      // Basic prose styles - might need refinement for specific elements like lists
      lineHeight: 1.5,
    };
  };
  const loaderContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    minHeight: "20px",
  };
  const loaderStyleBase: React.CSSProperties = {
    // Renamed to Base
    height: "1rem",
    width: "1rem",
    // Animation handled by CSS class
    color: currentTheme.loader,
  };
  const footerStyle: React.CSSProperties = {
    padding: "0.75rem", // p-3
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    backgroundColor: currentTheme.background,
    borderTopColor: currentTheme.border,
  };
  const inputAreaStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "flex-end", // items-end
    gap: "0.5rem", // gap-2
  };
  const textareaBaseStyle: React.CSSProperties = {
    flex: "1 1 0%",
    border: "none",
    borderRadius: BORDER_RADIUS,
    resize: "none",
    padding: "0.5rem",
    fontSize: BASE_FONT_SIZE,
    // Outline handled by CSS
  };
  const textareaThemeStyle: React.CSSProperties = {
    backgroundColor: currentTheme.inputBg,
    color: currentTheme.text,
    // Placeholder color handled by CSS
  };
  const sendButtonStyleBase: React.CSSProperties = {
    height: "2.5rem",
    width: "2.5rem",
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDER_RADIUS,
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease-out, opacity 0.2s ease-out", // Add transitions
    // Disabled state handled by CSS
  };
  const sendButtonThemeStyle: React.CSSProperties = {
    backgroundColor: accentColor ? accentColor : currentTheme.buttonBg,
    color: accentColor ? "#ffffff" : currentTheme.buttonText,
  };
  const toggleButtonBaseStyle: React.CSSProperties = {
    height: "3rem",
    width: "3rem",
    borderRadius: BORDER_RADIUS_FULL,
    boxShadow: SHADOW_LG,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease-out", // Add transition
    // Pulse animation handled by CSS class conditionally
  };
  const getToggleButtonThemeStyle = (): React.CSSProperties => {
    if (accentColor) {
      return { backgroundColor: accentColor, color: "#ffffff" };
    }
    if (theme === "light") {
      return isOpen
        ? {
            backgroundColor: colors.light.toggleOpenBg,
            color: colors.light.toggleOpenText,
          }
        : {
            backgroundColor: colors.light.buttonBg,
            color: colors.light.buttonText,
          };
    } else {
      // dark and doctalkie
      return isOpen
        ? {
            backgroundColor: currentTheme.toggleOpenBg, // secondary
            color: currentTheme.toggleOpenText, // secondary-foreground
          }
        : {
            backgroundColor: currentTheme.buttonBg, // primary or white
            color: currentTheme.buttonText, // primary-foreground or black
          };
    }
  };
  const PreComponent = ({
    node,
    ...props
  }: any): React.ReactElement<HTMLPreElement> => {
    // Combine potential props.className with our styles
    const preStyle: React.CSSProperties = {
      backgroundColor: currentTheme.codeBg,
      padding: "0.75rem", // p-3
      borderRadius: BORDER_RADIUS, // rounded-md
      overflowX: "auto",
      margin: "0.5rem 0", // my-2
    };
    // props might contain className, handle it if needed, or just apply styles
    return <pre style={preStyle} {...props} />;
  };

  // --- Calculate CSS Variables ---
  const cssVariables: React.CSSProperties = {
    "--dt-ring-color": accentColor || currentTheme.ring,
    "--dt-placeholder-color": currentTheme.placeholder,
    "--dt-button-hover-bg": accentColor
      ? accentColor
      : currentTheme.buttonHoverBg, // Keep accent on hover if set
    "--dt-close-hover-color": currentTheme.closeIconHover,
    "--dt-toggle-hover-bg": accentColor
      ? accentColor // Keep accent on hover if set
      : isOpen
      ? currentTheme.toggleOpenHoverBg
      : currentTheme.buttonHoverBg, // Hover depends on open state if no accent
    // Convert HSL/HEX of primary button bg to RGB for pulse animation
    // This is a simplified conversion, might need a robust library for perfect accuracy
    "--dt-pulse-color-rgb":
      theme === "light"
        ? "31, 41, 55" // dark grey approx for light theme pulse
        : "255, 255, 255", // white for dark/doctalkie pulse
  } as React.CSSProperties;

  // Determine if pulse animation should be active
  const shouldPulse =
    !isOpen && !accentColor && (theme === "dark" || theme === "doctalkie");

  // Определяем цвет индикатора
  const getIndicatorColor = (): string => {
    if (isNameLoading) return "#facc15"; // Желтый (loading - tailwind yellow-400)
    if (nameFetchError) return "#ef4444"; // Красный (error - tailwind red-500)
    return "#22c55e"; // Зеленый (success - tailwind green-500)
  };

  // --- JSX ---
  return (
    <div style={{ ...rootStyleBase, ...cssVariables }} className={className}>
      {isRendered && (
        <div
          style={{
            ...chatCardBaseStyle,
            ...chatCardThemeStyle,
            ...chatCardAnimationStyle,
          }}
        >
          {/* Header */}
          <div style={headerStyle}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Добавлен индикатор с динамическим цветом */}
              <div
                className="dt-chat-indicator"
                style={{
                  ...indicatorBaseStyle,
                  backgroundColor: getIndicatorColor(),
                }}
              ></div>
              <span style={headerTextStyle}>
                {isNameLoading ? "Loading..." : botName}
              </span>
            </div>
            {/* Added close button class, removed hover handlers */}
            <button
              className="dt-chat-close-button"
              style={closeButtonStyle}
              onClick={toggleChat}
            >
              <IconX style={{ height: "1rem", width: "1rem" }} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={messagesContainerStyle}>
            {messageSendError && (
              <div style={errorStyle}>{messageSendError}</div>
            )}
            {messages.map((message) => (
              <div key={message.id} style={getMessageStyle(message.sender)}>
                {message.isLoading ? (
                  <div style={loaderContainerStyle}>
                    {/* Added loader class, removed inline animation */}
                    <IconLoader
                      className="dt-chat-loader"
                      style={loaderStyleBase}
                    />
                  </div>
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{ pre: PreComponent }}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div style={footerStyle}>
            <div style={inputAreaStyle}>
              <TextareaAutosize
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                // Added textarea class, combined styles, removed focus handlers
                className="dt-chat-textarea"
                style={{ ...textareaBaseStyle, ...textareaThemeStyle } as any}
                minRows={1}
                maxRows={4}
                disabled={isLoading}
              />
              {/* Added send button class, combined styles, removed disabled style logic */}
              <button
                className="dt-chat-send-button"
                style={{ ...sendButtonStyleBase, ...sendButtonThemeStyle }}
                onClick={handleTriggerSend}
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  // Added loader class, removed inline animation
                  <IconLoader
                    className="dt-chat-loader"
                    style={{ height: "1rem", width: "1rem" }}
                  />
                ) : (
                  <IconSend style={{ height: "1rem", width: "1rem" }} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        // Added toggle button class and conditional pulse class
        className={`dt-chat-toggle-button ${
          shouldPulse ? "dt-chat-pulse-glow" : ""
        }`}
        style={{ ...toggleButtonBaseStyle, ...getToggleButtonThemeStyle() }}
        onClick={toggleChat}
      >
        {isOpen ? (
          <IconX style={{ height: "1.25rem", width: "1.25rem" }} />
        ) : (
          <IconMessageCircle style={{ height: "1.25rem", width: "1.25rem" }} />
        )}
      </button>
    </div>
  );
}

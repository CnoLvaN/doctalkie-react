# DocTalkie - AI Assistant Integration Service

Welcome to the official documentation for DocTalkie. Here you will find everything you need to embed the chat widget or build your own chat interface using our tools.

DocTalkie allows you to create AI assistants based on your documents. This documentation covers how to integrate the chat experience into your application.

Explore the sections below: 'Usage: Chat Widget' for the quickest integration, or 'Usage: Hook' for building a custom interface.

---

## Installation

To integrate DocTalkie into your React project, install the package using your preferred package manager:

**Using npm:**

```bash
npm install doctalkie-react
```

**Using yarn:**

```bash
yarn add doctalkie-react
```

**Using pnpm:**

```bash
pnpm add doctalkie-react
```

Once installed, you can import the necessary components or hooks into your application as shown in the usage sections.

---

## Usage: Chat Widget (Minimal)

The easiest way to add a DocTalkie chat to your application is by using the built-in `DocTalkieChat` component. It provides a ready-to-use floating chat interface. Below is the minimal setup required.

**Minimal Example:**

```typescript
import DocTalkieChat from "@/components/doc-talkie-chat/doc-talkie-chat";

export default function MyApp() {
  // Get these values from your DocTalkie dashboard for the specific bot
  const botApiUrl = "YOUR_BOT_API_URL"; // Replace with your Bot's API URL
  const botApiKey = "YOUR_BOT_API_KEY"; // Replace with your Bot's API Key

  return (
    <div>
      <h1>My Application</h1>
      {/* Minimal chat widget setup */}
      <DocTalkieChat apiURL={botApiUrl} apiKey={botApiKey} />
    </div>
  );
}
```

Replace `YOUR_BOT_API_URL` and `YOUR_BOT_API_KEY` with the actual URL and key provided for your bot in the DocTalkie dashboard.

---

## Widget Configuration & Customization

The `DocTalkieChat` component accepts required and optional props for customization:

### Required Props

| Prop     | Description                                                     | Type     |
| :------- | :-------------------------------------------------------------- | :------- |
| `apiURL` | The **full API URL** for your bot, obtained from the dashboard. | `string` |
| `apiKey` | The specific API key for your bot, obtained from the dashboard. | `string` |

### Optional Props

| Prop             | Description                                                                                    | Type     | Default                               |
| :--------------- | :--------------------------------------------------------------------------------------------- | :------- | :------------------------------------ |
| `theme`          | Visual theme ("light", "dark", or "doctalkie").                                                | `string` | `"doctalkie"`                         |
| `accentColor`    | Background color for user messages (e.g., "#FF5733"). Overrides theme color for user messages. | `string` | Theme default                         |
| `position`       | Widget position ("bottom-right" or "bottom-left").                                             | `string` | `"bottom-right"`                      |
| `welcomeMessage` | Custom initial message from the assistant.                                                     | `string` | "Hi there! How can I help you today?" |
| `className`      | Additional CSS classes for the root widget container.                                          | `string` | None                                  |

### Example with Customizations

Demonstrating various optional props.

```typescript
import DocTalkieChat from "@/components/doc-talkie-chat/doc-talkie-chat";
// import './my-custom-styles.css'; // If using className

export default function AnotherPage() {
  const botApiUrl = "YOUR_BOT_API_URL"; // Replace with your Bot's API URL
  const botApiKey = "YOUR_BOT_API_KEY"; // Replace with your Bot's API Key

  return (
    <div className="app">
      <header>
        <h1>Another Page with Customized Chat</h1>
      </header>
      {/* --- Customized DocTalkie Chat Widget --- */}
      <DocTalkieChat
        apiURL={botApiUrl}
        apiKey={botApiKey}
        // Customizations:
        theme="light"
        position="bottom-left"
        accentColor="#8B5CF6" // Example: Violet color for user messages
        welcomeMessage="Ask me anything about the advanced topics!"
        className="my-custom-widget-styles" // Optional custom class for further styling
      />
      {/* --------------------------------------- */}
    </div>
  );
}
```

---

## Usage: Hook (Advanced)

For complete control over the chat UI, you can use the `useDocTalkie` hook. It handles the API communication and state management, allowing you to build a custom interface.

**Example:**

```typescript
import { useState, useEffect } from "react";
import {
  useDocTalkie,
  type Message,
} from "@/components/doc-talkie-chat/use-doc-talkie";

function MyCustomChatInterface() {
  const botApiUrl = "YOUR_BOT_API_URL"; // Replace with your Bot's API URL
  const botApiKey = "YOUR_BOT_API_KEY"; // Replace with your Bot's API Key
  const [input, setInput] = useState("");

  const { messages, isLoading, error, sendMessage } = useDocTalkie({
    apiURL: botApiUrl, // Use the full URL directly
    apiKey: botApiKey,
    // Optional: Provide initial messages if needed
    // initialMessages: [{ id: 'custom-start', content: 'Start here!', sender: 'system' }]
  });

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="my-chat-container">
      <div className="messages-area">
        {error && <div className="error-message">{error}</div>}
        {messages.map((msg: Message) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {/* Render your message bubble here using msg.content */}
            {/* You might want to use react-markdown here too! */}
            <p>{msg.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className="loading-indicator">Assistant is typing...</div>
        )}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading || !input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}
```

The hook returns an object containing:

- `messages`: An array of message objects.
- `isLoading`: Boolean indicating if a response is pending.
- `error`: String containing an error message, if any.
- `sendMessage`: Function to send a new user message (takes the message string as input).

Remember to replace the placeholder IDs and keys, and style the elements (`.my-chat-container`, `.message`, etc.) according to your design.

---

Manage your bots and API keys via the [DocTalkie Dashboard](/dashboard).

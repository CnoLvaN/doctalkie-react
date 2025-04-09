# doctalkie-react

React component for DocTalkie AI chat widget

## Installation

```npm
  npm install doctalkie-react
```

Or with yarn:

```yarn
yarn add doctalkie-react
```

## API Reference

### DocTalkieChat Component

The main component that renders a chat interface for interacting with your documents.

| Prop       | Type                  | Description                                        |
| ---------- | --------------------- | -------------------------------------------------- |
| `apiUrl`   | `string`              | The URL of your DocTalkie API endpoint             |
| `apiKey`   | `string`              | Your DocTalkie API key                             |
| `theme`    | `object` _(optional)_ | Custom theme options for the chat interface        |
| `position` | `string` _(optional)_ | Position of the chat widget: `'right'` or `'left'` |

## Examples

Here's a simple example of how to use the DocTalkieChat component in a React application:

```ts
import React from "react";
import { DocTalkieChat } from "doctalkie-react";

const API = 'your-api'
const KEY = 'your-key'

function DocumentAssistantPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">My Documentation</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <h2 className="text-xl font-semibold mb-4">
              Product Documentation
            </h2>
            <p>This is where your documentation content would go...</p>
          </div>
        </div>
      </main>

      {/* DocTalkie Chat Widget */}
      <DocTalkieChat
        apiUrl=API
        apiKey=KEY
        position="right"
        theme={{
          primaryColor: "#3B82F6",
          textColor: "#FFFFFF",
          backgroundColor: "#1F2937",
        }}
      />
    </div>
  );
}

export default DocumentAssistantPage;
```

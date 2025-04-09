'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var useChat = function (_a) {
    var apiKey = _a.apiKey, initialMessage = _a.initialMessage;
    var _b = react.useState(initialMessage ? [{ text: initialMessage, isUser: false }] : []), messages = _b[0], setMessages = _b[1];
    var _c = react.useState(""), inputValue = _c[0], setInputValue = _c[1];
    var _d = react.useState(false), isLoading = _d[0], setIsLoading = _d[1];
    var _e = react.useState(null), error = _e[0], setError = _e[1];
    var sendMessage = react.useCallback(function (message) { return __awaiter(void 0, void 0, void 0, function () {
        var newUserMessage, aiResponseMessage;
        return __generator(this, function (_a) {
            if (!message.trim()) {
                return [2 /*return*/];
            }
            newUserMessage = {
                text: message,
                isUser: true,
                timestamp: new Date(),
            };
            setMessages(function (prevMessages) { return __spreadArray(__spreadArray([], prevMessages, true), [newUserMessage], false); });
            setInputValue("");
            setIsLoading(true);
            setError(null);
            console.log("Сообщение отправлено:", message, "API Key:", apiKey);
            aiResponseMessage = {
                text: "Ответ от ИИ (заглушка)",
                isUser: false,
                timestamp: new Date(),
            };
            setMessages(function (prevMessages) { return __spreadArray(__spreadArray([], prevMessages, true), [aiResponseMessage], false); });
            setIsLoading(false);
            return [2 /*return*/];
        });
    }); }, [apiKey]);
    return {
        messages: messages,
        inputValue: inputValue,
        isLoading: isLoading,
        error: error,
        setInputValue: setInputValue,
        sendMessage: sendMessage,
    };
};

var ChatWidget = function (_a) {
    var apiKey = _a.apiKey, initialMessage = _a.initialMessage, className = _a.className, style = _a.style;
    var _b = useChat({ apiKey: apiKey, initialMessage: initialMessage }), messages = _b.messages, inputValue = _b.inputValue, isLoading = _b.isLoading, error = _b.error, setInputValue = _b.setInputValue, sendMessage = _b.sendMessage;
    var handleInputChange = function (event) {
        setInputValue(event.target.value);
    };
    var handleSendMessage = function () {
        sendMessage(inputValue);
    };
    var handleKeyDown = function (event) {
        if (event.key === "Enter" && !isLoading) {
            handleSendMessage();
        }
    };
    return (jsxRuntime.jsxs("div", { className: "doctalkie-chat-widget ".concat(className || ""), style: style, children: [jsxRuntime.jsxs("div", { className: "chat-messages", children: [messages.map(function (msg, index) { return (jsxRuntime.jsxs("div", { className: "message ".concat(msg.isUser ? "user" : "ai"), children: [msg.text, msg.timestamp && (jsxRuntime.jsx("span", { className: "timestamp", children: new Date(msg.timestamp).toLocaleTimeString() }))] }, index)); }), isLoading && jsxRuntime.jsx("div", { className: "loading", children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." }), error && jsxRuntime.jsx("div", { className: "error", children: error })] }), jsxRuntime.jsxs("div", { className: "chat-input", children: [jsxRuntime.jsx("input", { type: "text", value: inputValue, onChange: handleInputChange, onKeyDown: handleKeyDown, placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 \u0432\u043E\u043F\u0440\u043E\u0441...", disabled: isLoading }), jsxRuntime.jsx("button", { onClick: handleSendMessage, disabled: isLoading, children: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C" })] }), jsxRuntime.jsx("style", { jsx: true, children: "\n        .doctalkie-chat-widget {\n          border: 1px solid #ccc;\n          border-radius: 5px;\n          overflow: hidden;\n          display: flex;\n          flex-direction: column;\n          height: 300px; /* \u041F\u0440\u0438\u043C\u0435\u0440 \u0432\u044B\u0441\u043E\u0442\u044B */\n          width: 300px; /* \u041F\u0440\u0438\u043C\u0435\u0440 \u0448\u0438\u0440\u0438\u043D\u044B */\n        }\n\n        .chat-messages {\n          flex-grow: 1;\n          padding: 10px;\n          overflow-y: auto;\n          display: flex;\n          flex-direction: column;\n        }\n\n        .message {\n          padding: 8px 12px;\n          margin-bottom: 5px;\n          border-radius: 5px;\n          word-break: break-word;\n          font-size: 0.9rem;\n        }\n\n        .message.user {\n          background-color: #e0f7fa;\n          align-self: flex-end;\n        }\n\n        .message.ai {\n          background-color: #f0f0f0;\n          align-self: flex-start;\n        }\n\n        .timestamp {\n          display: block;\n          font-size: 0.7rem;\n          color: #777;\n          margin-top: 3px;\n        }\n\n        .loading,\n        .error {\n          padding: 8px;\n          text-align: center;\n          font-style: italic;\n          color: #555;\n        }\n\n        .error {\n          color: red;\n        }\n\n        .chat-input {\n          display: flex;\n          padding: 10px;\n          border-top: 1px solid #eee;\n        }\n\n        .chat-input input {\n          flex-grow: 1;\n          padding: 8px;\n          border: 1px solid #ccc;\n          border-radius: 3px 0 0 3px;\n          outline: none;\n        }\n\n        .chat-input button {\n          padding: 8px 15px;\n          border: 1px solid #ccc;\n          border-radius: 0 3px 3px 0;\n          background-color: #007bff;\n          color: white;\n          cursor: pointer;\n          transition: background-color 0.3s ease;\n        }\n\n        .chat-input button:hover {\n          background-color: #0056b3;\n        }\n\n        .chat-input button:disabled {\n          background-color: #ccc;\n          cursor: not-allowed;\n        }\n      " })] }));
};

exports.ChatWidget = ChatWidget;

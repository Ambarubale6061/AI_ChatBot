# AI_ChatBot

📘 Real-Time AI Chatbot (WebSocket Streaming)

A modern, responsive, and ChatGPT-style AI chat application built using Next.js 14, React, TypeScript, TailwindCSS, and WebSockets.
It supports real-time streaming responses, ChatGPT-like UI, dark/light theme, and modular clean code structure.

🖼 UI Preview

(As per your provided screenshot)

Left Sidebar — New Chat, Search, Library, Your Chats

Glassy, padded main chat area

Streaming assistant text

Message input bar with “Send” + “Mic”

Modern shadows, spacing, rounded UI (ChatGPT styling)

🚀 Features
✔ Core Features

Real-time streaming responses using WebSockets

ChatGPT-style sidebar

Smooth auto-scroll message list

Input auto-disable during streaming

Dark/Light theme

Clear chat functionality

Fully responsive UI

Modular, clean component structure

Type-safe with TypeScript

Custom hook: useWebSocket()

Lucide icons for modern UI

✔ UI/UX Features

Chat bubbles (User + Assistant)

Elevation shadows + rounded corners

Sticky bottom input

Animated typing experience

Keyboard shortcuts (Enter to send)

📦 Tech Stack
Layer Technology
Framework Next.js 14 App Router
Language TypeScript
Styling TailwindCSS
Icons Lucide-react
Real-time WebSockets (custom hook stream)
UI State React hooks
Layout Component-based, scalable file structure
🛠 Installation & Setup
1️⃣ Clone the Repository
git clone <repo-url>
cd frontend

2️⃣ Install Dependencies
npm install

3️⃣ Create .env.local

Create a file in the project root:

NEXT_PUBLIC_WS_URL=ws://localhost:3001
NEXT_PUBLIC_APP_TITLE=Real-Time AI Chat

Modify the WebSocket URL to your backend server.

▶️ Running the Project
Development Mode
npm run dev

# Runs at http://localhost:3000

Production Build
npm run build
npm start

📂 Project Structure
frontend/
├─ app/
│ ├─ layout.tsx
│ ├─ page.tsx
│ ├─ ThemeProvider.tsx
├─ components/
│ ├─ Sidebar.tsx
│ ├─ ChatPage.tsx
│ ├─ MessageList.tsx
│ ├─ MessageBubble.tsx
│ ├─ ChatInput.tsx
├─ hooks/
│ └─ useWebSocket.ts
├─ public/
├─ styles/
│ └─ globals.css
└─ README.md

Component Breakdown
🔹 Sidebar.tsx

ChatGPT-style left sidebar: New Chat, Search, History, Library.

🔹 ChatPage.tsx

Main chat screen controller – connects messages + input.

🔹 MessageList.tsx

Renders streaming messages with smooth auto-scroll.

🔹 ChatInput.tsx

User input bar with +, Send, and Mic icons.

🔹 useWebSocket.ts

Handles WS connection, streaming, message state, callbacks.

🔧 Environment Variables
Variable Description
NEXT_PUBLIC_WS_URL WebSocket endpoint for streaming
NEXT_PUBLIC_APP_TITLE App name (used in layout metadata)

Example:

NEXT_PUBLIC_WS_URL=ws://localhost:3001
NEXT_PUBLIC_APP_TITLE=Real-Time AI Chat

✨ Checklist (Assignment Requirements)
Feature Status
Next.js 14 project setup ✔ Done
Real-time WebSocket streaming ✔ Done
Chat UI (Send + Stream) ✔ Done
Sidebar ChatGPT style ✔ Done
Clean modular components ✔ Done
Message auto-scroll ✔ Done
TailwindCSS styling ✔ Done
Dark/Light theme support ✔ Done
Clear chat button ✔ Done
Assignment README.md ✔ Done
🕒 Time Spent
Task Duration
Next.js project setup 20 mins
Sidebar UI 45 mins
Chat UI design 50 mins
WebSocket streaming integration 1 hr
Message system + auto-scroll 35 mins
Input bar + mic button 25 mins
Cleanup + bug fixes 20 mins
README documentation 25 mins
Total Time 4 hours 40 mins
📤 Deployment

You can deploy on:

▲ Vercel (Recommended)
vercel

🐳 Docker

(Dockerfile not included but can be generated)

📚 Future Enhancements

Chat history persistence (local DB / server)

User authentication

Multiple models support

File upload (PDF/Image input)

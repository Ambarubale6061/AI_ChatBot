# 🚀 **Real-Time AI Chatbot — WebSocket Streaming (Next.js 14)**

*A modern, ChatGPT-style conversational AI with real-time streaming.*

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-blue?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/WebSockets-Streaming-green?style=for-the-badge&logo=socketdotio" />
</p>

---

# 🎯 **Overview**

This project is a **ChatGPT-inspired Real-Time AI Chatbot** built with
**Next.js 14 + React + WebSockets**, designed to stream responses smoothly like GPT models.

It includes:

✔ ChatGPT-style **left sidebar**
✔ Real-time streaming **assistant typing**
✔ Dark/Light mode
✔ Clean modular architecture
✔ Aesthetic, modern UI

This project is perfect for **frontend assignment**, **portfolio**, and **production-grade use**.

---

# ✨ **Features**

## 🔥 Core Functionality

* ⚡ Real-time WebSocket streaming
* 🎤 Chat input bar with **Mic + Plus + Send**
* 🔄 Auto-scrolling message view
* 🚫 Input auto-disabled during streaming
* 🧹 Clear chat button
* 💬 Chat bubbles (User & Assistant)
* 🎚 Smooth animations

## 🧭 Sidebar (ChatGPT-Inspired)

* ➕ New Chat
* 🔍 Search Chat
* 📚 Library
* 🕑 Your Chats
* Beautiful compact layout with perfect spacing & shadows

## 🎨 UI / UX

* Modern rounded containers
* Shadowed glass-like card
* Perfect color palette
* Fully responsive
* Dark/Light toggling

---

# 🏗 **Tech Stack**

| Category         | Technology                      |
| ---------------- | ------------------------------- |
| Framework        | **Next.js 14 App Router**       |
| Language         | **TypeScript**                  |
| Styling          | **Tailwind CSS**                |
| WebSocket Client | Custom Hook (`useWebSocket.ts`) |
| Icons            | Lucide React                    |
| State            | React Hooks                     |
| Animations       | CSS + React                     |

---

# 📂 **Folder Structure**

```
frontend/
 ├── app/
 │   ├── layout.tsx
 │   ├── page.tsx
 │   ├── ThemeProvider.tsx
 ├── components/
 │   ├── Sidebar.tsx
 │   ├── ChatPage.tsx
 │   ├── ChatInput.tsx
 │   ├── MessageList.tsx
 │   ├── MessageBubble.tsx
 ├── hooks/
 │   └── useWebSocket.ts
 ├── public/
 ├── styles/
 │   └── globals.css
 └── README.md
```

---

# ⚙️ **Setup Instructions**

## 1️⃣ Clone the Project

```bash
git clone <repo-url>
cd frontend
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Environment Variables

Create **.env.local**:

```
NEXT_PUBLIC_WS_URL=ws://localhost:3001
NEXT_PUBLIC_APP_TITLE=Real-Time AI Chat
```

---

# ▶️ **Run the App**

## Development

```bash
npm run dev
```

App runs at:

```
http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```

---

# 🧪 **Checklist (Assignment Ready)**

| Requirement                  | Status |
| ---------------------------- | ------ |
| Real-time streaming          | ✔      |
| ChatGPT-like UI              | ✔      |
| Sidebar navigation           | ✔      |
| Clean code                   | ✔      |
| Component architecture       | ✔      |
| WebSocket integration        | ✔      |
| Light/Dark mode              | ✔      |
| README.md full documentation | ✔      |
| Clear button                 | ✔      |
| Mic button                   | ✔      |

---

# 📈 **Time Spent**

| Task                      | Duration     |
| ------------------------- | ------------ |
| UI/UX Design              | 1 hr         |
| Sidebar + Chat Layout     | 50 mins      |
| WebSocket streaming logic | 1 hr 10 mins |
| Components & architecture | 1 hr         |
| Cleanup & debugging       | 30 mins      |
| Writing README + docs     | 30 mins      |
| **Total**                 | **~5 hrs**   |

---

# 🧭 **System Architecture**

```
User Input → WebSocket Client → Backend WS Server → AI Model 
           ↑ ← Streaming Tokens ← ┘
```

Streaming tokens update the UI in real-time.

---

# 🚀 **Deploy on Vercel**

```
vercel
```

---

# 🛠 **Future Improvements**

* Chat history database
* Model selection
* Voice-to-text
* PDF / Image input
* Multi-chat workspace

---

# 👤 **Author**

**Ambar Ubale**
Frontend Developer — React • Next.js • TypeScript

---

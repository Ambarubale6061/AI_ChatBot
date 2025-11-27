'use client'
import React, { useEffect, useState } from 'react'
import useWebSocket from '../hooks/useWebSocket'
import MessageList from './MessageList'
import ChatInput from './ChatInput'

export default function ChatPage() {
  const { sendMessage, messages, clearMessages } = useWebSocket()

  const [inputDisabled, setInputDisabled] = useState(false)

  useEffect(() => {
    const streaming = messages.some(
      m => m.role === 'assistant' && m.streaming
    )
    setInputDisabled(streaming)
  }, [messages])

  const clearChatLocal = () => {
    clearMessages()
  }

  return (
    <div className="flex flex-col h-[80vh] relative">

      {/* ✨ Clean Floating Top Bar (No title) */}
      <div className="
        w-full py-2.5 mb-3
        flex justify-end items-center
        backdrop-blur-lg bg-white/10 dark:bg-black/20
        border border-white/10 dark:border-white/5
        rounded-xl shadow-lg
        px-4
      ">
        <button
          onClick={clearChatLocal}
          className="
            text-xs px-3 py-1 rounded-md 
            bg-red-500 hover:bg-red-600 
            text-white transition
            shadow-sm
          "
        >
          Clear
        </button>
      </div>

      {/* Messages */}
      <div className="
        flex-1 overflow-hidden rounded-xl border 
        border-slate-200 dark:border-slate-700 
        bg-white dark:bg-slate-800 
        p-4 shadow-inner
      ">
        <MessageList messages={messages} />
      </div>

      {/* Input */}
      <div className="mt-3">
        <ChatInput
          disabled={inputDisabled}
          onSend={async (text: string) => {
            await sendMessage(text)
          }}
        />
      </div>
    </div>
  )
}

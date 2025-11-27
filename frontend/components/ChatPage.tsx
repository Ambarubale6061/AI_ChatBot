'use client'
import React, { useEffect, useState } from 'react'
import useWebSocket from '../hooks/useWebSocket'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { ChatMessage } from '../types/chat'
import clsx from 'clsx'

export default function ChatPage() {
  const { status, sendMessage, messages, setMessages } = useWebSocket()
  const [inputDisabled, setInputDisabled] = useState(false)

  // Disable input while assistant is streaming
  useEffect(() => {
    const streaming = messages.some(m => m.role === 'assistant' && m.streaming)
    setInputDisabled(streaming)
  }, [messages])

  return (
    <div className="flex flex-col h-[70vh]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <ConnectionDot status={status} />
          <span className="text-sm text-slate-500 dark:text-slate-400">
            WebSocket: {status}
          </span>
        </div>

        <button
          className="text-sm underline"
          onClick={() => {
            if (confirm('Clear chat?')) setMessages([])
          }}
        >
          Clear chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
        <MessageList messages={messages} />
      </div>

      {/* Input */}
      <div className="mt-3">
        <ChatInput
          disabled={inputDisabled || status !== 'connected'}
          onSend={async (text: string) => {
            await sendMessage(text)
          }}
        />
      </div>
    </div>
  )
}

function ConnectionDot({ status }: { status: string }) {
  const color =
    status === 'connected'
      ? 'bg-green-400'
      : status === 'connecting'
      ? 'bg-yellow-400'
      : 'bg-red-500'

  return <span className={clsx('inline-block w-3 h-3 rounded-full', color)} />
}

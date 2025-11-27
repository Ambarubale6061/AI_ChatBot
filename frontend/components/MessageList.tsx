'use client'
import React, { useEffect, useRef } from 'react'
import { ChatMessage } from '../types/chat'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MessageList({ messages }: { messages: ChatMessage[] }) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // auto-scroll to bottom smoothly
    if (ref.current) {
      ref.current.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' })
    }
  }, [messages.length])

  return (
    <div ref={ref} className="h-full overflow-auto space-y-4">
      {messages.map(m => (
        <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[75%] p-3 rounded-lg ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100'}`}>
            <div className="text-xs opacity-70 mb-2">{m.role === 'user' ? 'You' : 'AI'} • {new Date(m.timestamp).toLocaleTimeString()}</div>
            {m.role === 'assistant' ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
            ) : (
              <div style={{whiteSpace: 'pre-wrap'}}>{m.content}</div>
            )}
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs opacity-60">{m.streaming ? '...streaming' : ''}</div>
              <div className="flex items-center space-x-2">
                <button onClick={() => navigator.clipboard.writeText(m.content)} className="text-xs underline">Copy</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
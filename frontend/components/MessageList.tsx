'use client'
import React, { useEffect, useRef, useState } from 'react'
import { ChatMessage } from '../types/chat'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Copy, CheckCircle } from 'lucide-react'

export default function MessageList({ messages }: { messages: ChatMessage[] }) {
  const ref = useRef<HTMLDivElement | null>(null)

  // Toast State
  const [showToast, setShowToast] = useState(false)

  const triggerToast = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 1400)
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages])

  return (
    <div className="relative h-full">

      {/* 🌟 CENTER TOP MODERN NOTIFICATION */}
      <div
        className={`
          fixed top-4 left-1/2 -translate-x-1/2
          flex items-center gap-2 px-4 py-2
          rounded-2xl font-medium text-sm
          backdrop-blur-2xl bg-white/20 dark:bg-black/30
          shadow-[0_4px_25px_rgba(0,0,0,0.25)]
          border border-white/30 text-white

          transition-all duration-300 ease-out
          ${showToast 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-90 -translate-y-3 pointer-events-none'}
        `}
      >
        <CheckCircle size={18} className="text-green-300" />
        Copied
      </div>

      {/* CHAT LIST */}
      <div ref={ref} className="h-full overflow-auto space-y-4 p-2">
        {messages.map((m) => {
          const isUser = m.role === 'user'

          return (
            <div
              key={m.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[75%] p-3 shadow rounded-2xl
                  ${isUser
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-bl-none'}
                `}
              >

                {/* CONTENT */}
                {m.role === 'assistant' ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {m.content}
                  </ReactMarkdown>
                ) : (
                  <div className="whitespace-pre-wrap">{m.content}</div>
                )}

                {/* COPY BUTTON (AI ONLY) */}
                {m.role === 'assistant' && (
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(m.content)
                        triggerToast()
                      }}
                      className="opacity-60 hover:opacity-100 transition"
                      title="Copy"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                )}

              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

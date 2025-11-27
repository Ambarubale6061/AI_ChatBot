'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Plus, Mic, Send } from 'lucide-react'

export default function ChatInput({
  disabled,
  onSend
}: {
  disabled?: boolean
  onSend: (text: string) => Promise<void>
}) {
  const [text, setText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const limit = 2000

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [text])

  const submit = async () => {
    if (!text.trim() || disabled) return

    setIsSending(true)
    const t = text
    setText('')

    await onSend(t)

    setTimeout(() => setIsSending(false), 400)
  }

  return (
    <div className="relative w-full">
      {/* Glassmorphism Bar */}
      <div className="
        backdrop-blur-xl bg-white/20 dark:bg-black/30 
        border border-white/20 dark:border-white/10
        shadow-lg
        rounded-2xl p-3 flex items-center gap-3
      ">
        
        {/* + Button (Left side like ChatGPT) */}
        <button
          className="
            w-10 h-10 rounded-full 
            bg-white/30 dark:bg-white/10
            flex items-center justify-center
            hover:scale-110 active:scale-95
            transition-all
          "
        >
          <Plus size={20} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              submit()
            }
          }}
          placeholder={disabled ? 'Waiting for AI...' : 'Message ChatGPT'}
          className="
            flex-1 bg-transparent outline-none resize-none 
            text-sm text-black dark:text-white
            max-h-[150px] min-h-[40px]
          "
          maxLength={limit}
          disabled={disabled}
        />

        {/* Mic + Send (Right side) */}
        <div className="flex items-center gap-2">
          {/* Mic Button */}
          <button
            className="
              w-10 h-10 rounded-full 
              bg-white/30 dark:bg-white/10
              flex items-center justify-center
              hover:scale-110 active:scale-95
              transition-all
            "
          >
            <Mic size={18} />
          </button>

          {/* Send Button */}
          <button
            onClick={() => submit()}
            disabled={disabled}
            className={`
              w-12 h-12 rounded-full flex items-center justify-center
              transition-all shadow-lg
              ${isSending ? 'animate-ping-once' : ''}
              ${text.trim() 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-white/40 dark:bg-white/10'}
            `}
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Animation Style */}
      <style jsx>{`
        .animate-ping-once {
          animation: pingOnce 0.35s ease-out;
        }
        @keyframes pingOnce {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

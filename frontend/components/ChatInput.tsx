'use client'
import React, { useState } from 'react'

export default function ChatInput({ disabled, onSend }: { disabled?: boolean, onSend: (text: string) => Promise<void> }) {
  const [text, setText] = useState('')
  const [charCount, setCharCount] = useState(0)
  const limit = 2000

  const submit = async () => {
    if (!text.trim()) return
    const t = text
    setText('')
    setCharCount(0)
    await onSend(t)
  }

  return (
    <div className="flex items-center space-x-2">
      <textarea
        value={text}
        onChange={(e) => { setText(e.target.value); setCharCount(e.target.value.length) }}
        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }}
        placeholder={disabled ? 'Waiting for AI...' : 'Type your message and press Enter'}
        className="flex-1 p-3 rounded-md border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 resize-none h-20"
        disabled={disabled}
        maxLength={limit}
      />
      <div className="flex flex-col items-end">
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 rounded-md bg-indigo-600 text-white disabled:opacity-50"
            onClick={() => submit()}
            disabled={disabled}
          >
            Send
          </button>
        </div>
        <div className="text-xs text-slate-500 mt-1">{charCount}/{limit}</div>
      </div>
    </div>
  )
}
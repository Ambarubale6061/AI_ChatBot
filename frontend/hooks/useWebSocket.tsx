'use client'
import { useEffect, useRef, useState } from 'react'
import { ChatMessage } from '../types/chat'
import { uid } from './uid'

type Status = 'connected' | 'disconnected' | 'connecting'

export default function useWebSocket() {
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000'
  const wsRef = useRef<WebSocket | null>(null)
  const [status, setStatus] = useState<Status>('connecting')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const reconnectTimer = useRef<number | null>(null)

  useEffect(() => {
    connect()
    return () => {
      if (reconnectTimer.current) window.clearTimeout(reconnectTimer.current)
      wsRef.current?.close()
    }
  }, [])

  function connect() {
    setStatus('connecting')
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onopen = () => setStatus('connected')

    ws.onclose = () => {
      setStatus('disconnected')
      reconnectTimer.current = window.setTimeout(connect, 1000)
    }

    ws.onerror = () => ws.close()

    ws.onmessage = ev => {
      try {
        handleServerEvent(JSON.parse(ev.data))
      } catch (e) {
        console.error('Invalid WS message:', ev.data)
      }
    }
  }

  function handleServerEvent(ev: any) {
    // AI typing start
    if (ev.type === 'assistant_start') {
      setMessages(prev => [
        ...prev,
        {
          id: ev.id,
          role: 'assistant',
          content: '',
          timestamp: Date.now(),
          streaming: true,
          isAi: true,
        },
      ])
      return
    }

    // AI streaming chunks
    if (ev.type === 'assistant_chunk') {
      setMessages(prev => {
        const idx = prev.findIndex(m => m.id === ev.id)
        if (idx === -1) return prev

        const copy = [...prev]
        copy[idx] = {
          ...copy[idx],
          content: copy[idx].content + ev.chunk,
        }
        return copy
      })
      return
    }

    // AI done
    if (ev.type === 'assistant_done') {
      setMessages(prev =>
        prev.map(m =>
          m.id === ev.id ? { ...m, streaming: false } : m
        )
      )
      return
    }
  }

  async function sendMessage(text: string) {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      alert('WebSocket not connected')
      return
    }

    const id = uid()

    // Add user message locally
    setMessages(prev => [
      ...prev,
      {
        id,
        role: 'user',
        content: text,
        timestamp: Date.now(),
        isAi: false,
      },
    ])

    wsRef.current.send(
      JSON.stringify({ type: 'user_message', id, content: text })
    )
  }

  // 🔥 NEW — Clear all messages safely
  function clearMessages() {
    setMessages([])   // UI clear
  }

  return { status, sendMessage, messages, clearMessages }
}

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

    ws.onopen = () => {
      setStatus('connected')
      console.info('WS connected')
    }

    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data)
        handleServerEvent(data)
      } catch (e) {
        console.error('Invalid WS message:', ev.data)
      }
    }

    ws.onclose = () => {
      setStatus('disconnected')
      console.warn('WS closed — reconnecting in 1s...')
      reconnectTimer.current = window.setTimeout(() => connect(), 1000)
    }

    ws.onerror = (err) => {
      console.error('WS error', err)
      ws.close()
    }
  }

  function handleServerEvent(ev: any) {
    // Supported:
    //  assistant_chunk: { id, chunk }
    //  assistant_done:  { id }
    //  user_ack:        { id }   <-- use this instead of echo

    if (ev.type === 'assistant_chunk') {
      setMessages(prev => {
        const idx = prev.findIndex(m => m.id === ev.id)

        if (idx === -1) {
          return [
            ...prev,
            {
              id: ev.id,
              role: 'assistant',
              content: ev.chunk,
              timestamp: Date.now(),
              streaming: true,
            },
          ]
        }

        const copy = [...prev]
        copy[idx] = {
          ...copy[idx],
          content: copy[idx].content + ev.chunk,
        }
        return copy
      })
    }

    else if (ev.type === 'assistant_done') {
      setMessages(prev =>
        prev.map(m =>
          m.id === ev.id ? { ...m, streaming: false } : m
        )
      )
    }

    else if (ev.type === 'user_ack') {
      // Server confirms user message received
      // NO ADD HERE (we already added it locally)
    }
  }

  async function sendMessage(text: string) {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      alert('WebSocket not connected')
      return
    }

    const id = uid()

    // Add user msg locally only ONCE
    setMessages(prev => [
      ...prev,
      {
        id,
        role: 'user',
        content: text,
        timestamp: Date.now(),
      },
    ])

    wsRef.current.send(
      JSON.stringify({ type: 'user_message', id, content: text })
    )
  }

  return { status, sendMessage, messages }
}

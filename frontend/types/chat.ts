export type Role = 'user' | 'assistant' | 'system'

export type ChatMessage = {
  id: string
  role: Role
  content: string
  timestamp: number
  streaming?: boolean
  isAi?: boolean   // 👈 ADD THIS
}

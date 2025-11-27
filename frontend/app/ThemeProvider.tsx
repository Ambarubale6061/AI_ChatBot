'use client'

import { useEffect, useState, ReactNode } from 'react'
import clsx from 'clsx'

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark'
    if (saved) setTheme(saved)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className={clsx('min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6')}>
      <div className="max-w-4xl mx-auto">
        <div className="mac-window p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">
              {process.env.NEXT_PUBLIC_APP_TITLE}
            </h1>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="px-3 py-1 rounded-md bg-slate-200 dark:bg-slate-700"
            >
              {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}

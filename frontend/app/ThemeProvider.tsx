'use client'

import { useEffect, useState, ReactNode } from 'react'
import clsx from 'clsx'

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark'
    if (saved) setTheme(saved)
  }, [])

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div
      className={clsx(
        'min-h-screen p-6 transition-all',
        'bg-slate-50 dark:bg-slate-900',
        'text-slate-900 dark:text-slate-100'
      )}
    >
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl shadow-xl border border-slate-300/60 dark:border-slate-700/60 p-4
                        bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold tracking-wide">
              {process.env.NEXT_PUBLIC_APP_TITLE || 'Real-Time AI Chat'}
            </h1>

            {/* THEME BUTTON */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium",
                "backdrop-blur-lg border border-slate-300/50 dark:border-slate-700/50",
                "bg-white/50 dark:bg-slate-800/50 shadow-sm",
                "hover:shadow-lg hover:scale-[1.03] active:scale-[0.97]"
              )}
            >
              {theme === 'dark' ? (
                <span className="flex items-center gap-2">
                  <span className="transition-transform rotate-0">☀️</span>
                  Light
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="transition-transform rotate-0">🌙</span>
                  Dark
                </span>
              )}
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}

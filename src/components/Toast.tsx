import { useEffect } from 'react'
import { useTaskContext } from '../hooks/useTaskContext'
import './Toast.scss'

export function Toast() {
  const { dismissToast, toast } = useTaskContext()

  useEffect(() => {
    if (!toast) return

    const hideTimer = window.setTimeout(dismissToast, toast.duration)
    return () => window.clearTimeout(hideTimer)
  }, [dismissToast, toast])

  if (!toast) return null

  return (
    <aside className={`toast toast--${toast.tone}`} role="status" aria-live="polite">
      <p className="toast__text">{toast.text}</p>
      <div className="toast__actions">
        {toast.actionLabel && toast.onAction && (
          <button className="button button--toast" type="button" onClick={toast.onAction}>
            {toast.actionLabel}
          </button>
        )}
        <button className="toast__close" type="button" aria-label="Закрити повідомлення" onClick={dismissToast}>
          ×
        </button>
      </div>
      {toast.showProgress && (
        <div className="toast__progress" aria-hidden="true">
          <span className="toast__progress-bar" style={{ animationDuration: `${toast.duration}ms` }} />
        </div>
      )}
    </aside>
  )
}

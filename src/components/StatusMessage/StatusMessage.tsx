import './StatusMessage.css'

interface StatusMessageProps {
  type: 'loading' | 'error'
  message: string
}

export function StatusMessage({ type, message }: StatusMessageProps) {
  return (
    <p className={`status-message status-message--${type}`} role="status">
      {message}
    </p>
  )
}

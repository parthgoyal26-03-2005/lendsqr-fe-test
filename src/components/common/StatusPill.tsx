import './StatusPill.scss'

interface StatusPillProps {
  status: string
}

export const StatusPill = ({ status }: StatusPillProps) => {
  const normalizedStatus = status.trim().toLowerCase() || 'inactive'

  return <span className={`status-pill status-pill--${normalizedStatus}`}>{status}</span>
}

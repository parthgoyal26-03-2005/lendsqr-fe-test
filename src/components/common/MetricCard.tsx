import './MetricCard.scss'

interface MetricCardProps {
  label: string
  value: string
  accent: 'blue' | 'green' | 'amber' | 'pink'
  note: string
  iconSrc?: string
  iconAlt?: string
}

export const MetricCard = ({ label, value, accent, note, iconSrc, iconAlt }: MetricCardProps) => (
  <article className={`metric-card metric-card--${accent}`}>
    <span className="metric-card__icon" aria-hidden="true">
      {iconSrc ? <img src={iconSrc} alt={iconAlt ?? ''} /> : null}
    </span>
    <p>{label}</p>
    <strong>{value}</strong>
    {/* <span>{note}</span> */}
  </article>
)

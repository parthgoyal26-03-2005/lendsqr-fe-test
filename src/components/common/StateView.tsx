import { Button } from './Button'
import './StateView.scss'

interface StateViewProps {
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
}

export const LoadingView = ({ message }: Pick<StateViewProps, 'message'>) => (
  <div className="state-view">
    <div className="state-view__spinner" aria-hidden="true" />
    <p>{message}</p>
  </div>
)

export const EmptyView = ({ title, message, actionLabel, onAction }: StateViewProps) => (
  <div className="state-view">
    <h3>{title}</h3>
    <p>{message}</p>
    {actionLabel && onAction ? (
      <Button type="button" onClick={onAction}>
        {actionLabel}
      </Button>
    ) : null}
  </div>
)

export const ErrorView = ({ title, message, actionLabel, onAction }: StateViewProps) => (
  <div className="state-view state-view--error">
    <h3>{title}</h3>
    <p>{message}</p>
    {actionLabel && onAction ? (
      <Button type="button" onClick={onAction}>
        {actionLabel}
      </Button>
    ) : null}
  </div>
)

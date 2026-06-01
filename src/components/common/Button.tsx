import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.scss'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
}

export const Button = ({ variant = 'primary', className = '', children, ...props }: ButtonProps) => {
  const buttonClassName = ['app-button', `app-button--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  )
}

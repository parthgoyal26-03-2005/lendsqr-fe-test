import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react'
import './Field.scss'

interface FieldBaseProps {
  label: string
  error?: string
}

type InputFieldProps = FieldBaseProps & InputHTMLAttributes<HTMLInputElement>
type SelectFieldProps = FieldBaseProps & SelectHTMLAttributes<HTMLSelectElement>

export const InputField = ({ label, error, className = '', ...props }: InputFieldProps) => (
  <label className="app-field">
    <span className="app-field__label">{label}</span>
    <input className={['app-field__control', className].filter(Boolean).join(' ')} {...props} />
    {error ? <span className="app-field__error">{error}</span> : null}
  </label>
)

export const SelectField = ({ label, error, className = '', children, ...props }: SelectFieldProps) => (
  <label className="app-field">
    <span className="app-field__label">{label}</span>
    <select className={['app-field__control', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </select>
    {error ? <span className="app-field__error">{error}</span> : null}
  </label>
)

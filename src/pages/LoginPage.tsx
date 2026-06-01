import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { InputField } from '../components/common/Field'
import { hasAuthSession, setAuthSession } from '../utils/storage'
import './LoginPage.scss'

export const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (hasAuthSession()) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setAuthSession()
    navigate('/dashboard')
  }

  return (
    <main className="login-page">
      <section className="login-page__visual" aria-hidden="true">
        <img className="login-page__visual-logo" src="/Group.svg" alt="" />
        <img className="login-page__illustration" src="/pablo-sign-in%201.svg" alt="" />
      </section>

      <section className="login-page__panel">
        <div className="login-page__panel-inner">
          <h1>Welcome!</h1>
          <p>Enter your email and password to access your dashboard.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <InputField
              label="Password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button type="button" className="login-form__link">
              FORGOT PASSWORD?
            </button>

            <Button type="submit">LOG IN</Button>
          </form>
        </div>
      </section>
    </main>
  )
}

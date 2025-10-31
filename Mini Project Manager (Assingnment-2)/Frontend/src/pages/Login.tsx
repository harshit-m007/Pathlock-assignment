import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      const res = mode === 'login' ? await api.login(email, password) : await api.register(email, password)
      localStorage.setItem('token', res.token)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="grid" style={{ maxWidth: 420, margin: '0 auto' }}>
      <div className="card">
        <div className="title-row">
          <h3>{mode === 'login' ? 'Welcome back' : 'Create an account'}</h3>
          <span className="muted">Mini Project Manager</span>
        </div>
        <form onSubmit={submit} className="grid">
          <input className="input" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="input" placeholder="Password" type="password" minLength={6} value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <div className="muted" style={{ color: '#ef4444' }}>{error}</div>}
          <button className="btn" type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
        </form>
      </div>
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="muted">{mode === 'login' ? "Don't have an account?" : 'Already have an account?'}</span>
        <button className="btn secondary" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          Switch to {mode === 'login' ? 'Register' : 'Login'}
        </button>
      </div>
    </div>
  )
}



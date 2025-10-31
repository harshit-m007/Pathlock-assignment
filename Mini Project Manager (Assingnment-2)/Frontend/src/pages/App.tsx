import { Outlet, Link, useNavigate } from 'react-router-dom'

export default function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  return (
    <div className="container">
      <header className="nav">
        <h2>Mini Project Manager</h2>
        <div className="spacer" />
        {token ? (
          <>
            <Link to="/dashboard" className="btn secondary">Dashboard</Link>
            <button className="btn" onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>Logout</button>
          </>
        ) : null}
      </header>
      <div style={{ height: 16 }} />
      <Outlet />
    </div>
  )
}



import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'

type Project = { id: number; title: string; description?: string | null; createdAt: string }

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  async function load() {
    const list = await api.listProjects()
    setProjects(list)
  }

  useEffect(() => { load() }, [])

  async function create(e: React.FormEvent) {
    e.preventDefault()
    await api.createProject({ title, description })
    setTitle(''); setDescription('')
    await load()
  }

  async function remove(id: number) {
    await api.deleteProject(id)
    await load()
  }

  return (
    <div className="grid">
      <div className="card">
        <div className="title-row">
          <h3>Projects</h3>
          <span className="muted">Create and manage your projects</span>
        </div>
        <form onSubmit={create} className="grid" style={{ maxWidth: 520 }}>
          <input className="input" required minLength={3} maxLength={100} placeholder="Project title" value={title} onChange={e => setTitle(e.target.value)} />
          <input className="input" maxLength={500} placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} />
          <div>
            <button className="btn" type="submit">Create Project</button>
          </div>
        </form>
      </div>

      <div className="card">
        <ul className="list">
          {projects.map(p => (
            <li key={p.id}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{p.title}</div>
                {p.description ? <div className="muted">{p.description}</div> : null}
              </div>
              <Link to={`/projects/${p.id}`} className="btn secondary">Open</Link>
              <button className="btn danger" onClick={() => remove(p.id)}>Delete</button>
            </li>
          ))}
          {projects.length === 0 && (
            <li><span className="muted">No projects yet. Create one above.</span></li>
          )}
        </ul>
      </div>
    </div>
  )
}





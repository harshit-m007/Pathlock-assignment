import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../lib/api'

type Task = { id: number; title: string; dueDate?: string | null; isCompleted: boolean }
type Project = { id: number; title: string; description?: string | null; tasks: Task[] }

export default function Project() {
  const params = useParams()
  const id = useMemo(() => Number(params.id), [params.id])
  const [project, setProject] = useState<Project | null>(null)
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState<string>('')

  async function load() {
    const p = await api.getProject(id)
    setProject(p)
  }

  useEffect(() => { if (id) load() }, [id])

  async function addTask(e: React.FormEvent) {
    e.preventDefault()
    await api.addTask(id, { title, dueDate: dueDate || null })
    setTitle(''); setDueDate('')
    await load()
  }

  async function toggle(task: Task) {
    await api.updateTask(task.id, { title: task.title, dueDate: task.dueDate || null, isCompleted: !task.isCompleted })
    await load()
  }

  async function update(task: Task, newTitle: string) {
    await api.updateTask(task.id, { title: newTitle, dueDate: task.dueDate || null, isCompleted: task.isCompleted })
    await load()
  }

  async function remove(task: Task) {
    await api.deleteTask(task.id)
    await load()
  }

  async function schedule() {
    if (!project) return
    const payload = {
      tasks: project.tasks.map(t => ({ title: t.title, estimatedHours: 4, dueDate: t.dueDate, dependencies: [] }))
    }
    const res = await api.schedule(project.id, payload)
    const order: string[] = res?.recommendedOrder || []
    if (!order.length) {
      alert('No tasks to schedule. Add tasks first, then try again.')
      return
    }
    alert('Recommended: ' + order.join(' -> '))
  }

  if (!project) return <div className="card">Loading...</div>
  return (
    <div className="grid">
      <div className="card">
        <div className="title-row">
          <h3>{project.title}</h3>
          {project.description ? <span className="muted">{project.description}</span> : null}
          <div className="spacer" />
          <button className="btn" onClick={schedule}>Smart schedule</button>
        </div>
        <div className="grid" style={{ maxWidth: 520 }}>
          <form onSubmit={addTask} className="grid">
            <input className="input" required placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} />
            <input className="input" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            <div>
              <button className="btn" type="submit">Add Task</button>
            </div>
          </form>
        </div>
      </div>

      <div className="card">
        <ul className="list">
          {project.tasks.map(t => (
            <li key={t.id}>
              <input type="checkbox" checked={t.isCompleted} onChange={() => toggle(t)} />
              <input className="input" value={t.title} onChange={e => update(t, e.target.value)} />
              <button className="btn danger" onClick={() => remove(t)}>Delete</button>
            </li>
          ))}
          {project.tasks.length === 0 && (
            <li><span className="muted">No tasks yet. Add one above.</span></li>
          )}
        </ul>
      </div>
    </div>
  )
}





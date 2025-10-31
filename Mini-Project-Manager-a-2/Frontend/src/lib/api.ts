const API_BASE = import.meta.env.VITE_API_BASE || 'https://mini-project-manager-xfvj.onrender.com';

async function request(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) throw new Error((await res.text()) || res.statusText);
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  login: (email: string, password: string) => request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (email: string, password: string) => request('/api/auth/register', { method: 'POST', body: JSON.stringify({ email, password }) }),
  listProjects: () => request('/api/projects'),
  createProject: (data: { title: string; description?: string }) => request('/api/projects', { method: 'POST', body: JSON.stringify(data) }),
  getProject: (id: number) => request(`/api/projects/${id}`),
  deleteProject: (id: number) => request(`/api/projects/${id}`, { method: 'DELETE' }),
  addTask: (projectId: number, data: { title: string; dueDate?: string | null }) => request(`/api/projects/${projectId}/tasks`, { method: 'POST', body: JSON.stringify(data) }),
  updateTask: (taskId: number, data: { title: string; dueDate?: string | null; isCompleted: boolean }) => request(`/api/tasks/${taskId}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTask: (taskId: number) => request(`/api/tasks/${taskId}`, { method: 'DELETE' }),
  schedule: (projectId: number, payload: unknown) => request(`/api/v1/projects/${projectId}/schedule`, { method: 'POST', body: JSON.stringify(payload) }),
};



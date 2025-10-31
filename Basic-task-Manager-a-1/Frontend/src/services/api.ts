import axios from 'axios';
import { TaskItem } from '../types/Task';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://basic-task-manager-backend-fyx8.onrender.com';
const TASKS_ENDPOINT = `${API_BASE_URL}/api/tasks`;

export const taskApi = {
  getAllTasks: async (): Promise<TaskItem[]> => {
    const response = await axios.get<TaskItem[]>(TASKS_ENDPOINT);
    return response.data;
  },

  createTask: async (description: string): Promise<TaskItem> => {
    const response = await axios.post<TaskItem>(TASKS_ENDPOINT, {
      description,
      isCompleted: false,
    });
    return response.data;
  },

  updateTask: async (id: string, task: Partial<TaskItem>): Promise<TaskItem> => {
    const response = await axios.put<TaskItem>(`${TASKS_ENDPOINT}/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await axios.delete(`${TASKS_ENDPOINT}/${id}`);
  },
};

// LocalStorage helper functions
export const storageApi = {
  saveTasks: (tasks: TaskItem[]): void => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },

  getTasks: (): TaskItem[] => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  },

  clearTasks: (): void => {
    localStorage.removeItem('tasks');
  },
};




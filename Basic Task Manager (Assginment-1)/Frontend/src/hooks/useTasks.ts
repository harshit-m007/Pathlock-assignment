import { useState, useEffect } from 'react';
import { TaskItem, FilterType } from '../types/Task';
import { taskApi, storageApi } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks from API on mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Sync tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0 || localStorage.getItem('tasks')) {
      storageApi.saveTasks(tasks);
    }
  }, [tasks]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiTasks = await taskApi.getAllTasks();
      
      // If API returns empty, try loading from localStorage
      if (apiTasks.length === 0) {
        const storedTasks = storageApi.getTasks();
        if (storedTasks.length > 0) {
          setTasks(storedTasks);
          setLoading(false);
          return;
        }
      }
      
      setTasks(apiTasks);
    } catch (err) {
      console.error('Failed to load tasks from API:', err);
      // Fallback to localStorage if API fails
      const storedTasks = storageApi.getTasks();
      setTasks(storedTasks);
      setError('Failed to connect to API. Using local storage.');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (description: string) => {
    try {
      setError(null);
      const newTask = await taskApi.createTask(description);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error('Failed to create task:', err);
      // Fallback: create task locally
      const newTask: TaskItem = {
        id: crypto.randomUUID(),
        description,
        isCompleted: false,
      };
      setTasks((prev) => [...prev, newTask]);
      setError('Failed to connect to API. Task saved locally.');
    }
  };

  const toggleTask = async (id: string) => {
    try {
      setError(null);
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const updatedTask = await taskApi.updateTask(id, {
        ...task,
        isCompleted: !task.isCompleted,
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updatedTask : t))
      );
    } catch (err) {
      console.error('Failed to update task:', err);
      // Fallback: update task locally
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
        )
      );
      setError('Failed to connect to API. Task updated locally.');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setError(null);
      await taskApi.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
      // Fallback: delete task locally
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setError('Failed to connect to API. Task deleted locally.');
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.isCompleted;
    if (filter === 'active') return !task.isCompleted;
    return true;
  });

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    filter,
    setFilter,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    loadTasks,
  };
};




import React from 'react';
import { useTasks } from './hooks/useTasks';
import { AddTask } from './components/AddTask';
import { TaskList } from './components/TaskList';
import { Filter } from './components/Filter';
import './styles/index.css';

function App() {
  const {
    tasks,
    allTasks,
    filter,
    setFilter,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask,
  } = useTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
                <p className="text-sm text-gray-500">Stay organized and productive</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Total Tasks</div>
              <div className="text-2xl font-bold text-gray-900">{allTasks.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {error && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3">
              <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-amber-800">Connection Issue</h3>
                <p className="text-sm text-amber-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
            <AddTask onAddTask={addTask} />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
            <Filter filter={filter} onFilterChange={setFilter} />
            <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


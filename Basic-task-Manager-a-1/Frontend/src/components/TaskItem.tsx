import React from 'react';
import { TaskItem } from '../types/Task';

interface TaskItemProps {
  task: TaskItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItemComponent: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
}) => {
  return (
    <div className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="flex-shrink-0">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded-lg focus:ring-blue-500 cursor-pointer transition-colors"
        />
      </div>
      <span
        className={`flex-1 text-gray-800 transition-all duration-200 ${
          task.isCompleted
            ? 'line-through text-gray-400'
            : 'text-gray-800'
        }`}
      >
        {task.description}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center space-x-1"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <span className="text-sm font-medium">Delete</span>
      </button>
    </div>
  );
};




import React from 'react';
import { Task } from '../../types';
import { format } from 'date-fns';
import { AlertCircle, Clock } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Tasks</h3>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`flex-shrink-0 ${getPriorityColor(task.priority)}`}>
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Assigned to: {task.assignedTo}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                <span>{format(new Date(task.deadline), 'MMM d, yyyy')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { Task } from '../../types';
import { format } from 'date-fns';
import { CheckSquare, Clock } from 'lucide-react';

export default function TeamDashboard() {
  const { state } = useApp();
  const { user } = useAuth();
  
  const teamMember = state.team.find(member => member.email === user?.email);
  const assignedTasks = state.tasks.filter(task => task.assignedTo === teamMember?.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'done':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          My Tasks
        </h2>
        <div className="space-y-4">
          {assignedTasks.map((task: Task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <CheckSquare className="w-5 h-5 text-blue-500" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {task.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{format(new Date(task.deadline), 'MMM d, yyyy')}</span>
                </div>
              </div>
            </div>
          ))}
          {assignedTasks.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No tasks assigned yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
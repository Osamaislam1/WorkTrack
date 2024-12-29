import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../types';
import { AlertCircle, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface KanbanTaskProps {
  task: Task;
}

export default function KanbanTask({ task }: KanbanTaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow cursor-move"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
          {task.title}
        </h4>
        <div className={`${getPriorityColor(task.priority)}`}>
          <AlertCircle className="w-4 h-4" />
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        {task.description}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{task.assignedTo}</span>
        <div className="flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{format(new Date(task.deadline), 'MMM d')}</span>
        </div>
      </div>
    </div>
  );
}
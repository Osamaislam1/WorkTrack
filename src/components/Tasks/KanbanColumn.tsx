import React from 'react';
import { Task, Status } from '../../types';
import KanbanTask from './KanbanTask';

interface KanbanColumnProps {
  status: Status;
  tasks: Task[];
}

const columnTitles: Record<Status, string> = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done'
};

export default function KanbanColumn({ status, tasks }: KanbanColumnProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        {columnTitles[status]} ({tasks.length})
      </h3>
      <div className="space-y-3">
        {tasks.map((task) => (
          <KanbanTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
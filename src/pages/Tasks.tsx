import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TaskForm from '../components/Tasks/TaskForm';
import KanbanBoard from '../components/Tasks/KanbanBoard';
import { Plus } from 'lucide-react';

export default function Tasks() {
  const { dispatch } = useApp();
  const [showForm, setShowForm] = useState(false);

  const handleCreateTask = (taskData: any) => {
    dispatch({
      type: 'ADD_TASK',
      payload: { ...taskData, id: crypto.randomUUID() },
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Task
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <TaskForm onSubmit={handleCreateTask} />
        </div>
      )}

      <KanbanBoard />
    </div>
  );
}
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ProjectForm from '../components/Projects/ProjectForm';
import ProjectCard from '../components/Dashboard/ProjectCard';
import { Plus } from 'lucide-react';

export default function Projects() {
  const { state, dispatch } = useApp();
  const [showForm, setShowForm] = useState(false);

  const handleCreateProject = (projectData: any) => {
    dispatch({
      type: 'ADD_PROJECT',
      payload: { ...projectData, id: crypto.randomUUID() },
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Project
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <ProjectForm onSubmit={handleCreateProject} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
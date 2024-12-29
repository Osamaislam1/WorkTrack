import React from 'react';
import { Task, Priority, Status } from '../../types';
import { useApp } from '../../context/AppContext';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id'>) => void;
  initialData?: Task;
}

export default function TaskForm({ onSubmit, initialData }: TaskFormProps) {
  const { state } = useApp();
  const [formData, setFormData] = React.useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    assignedTo: initialData?.assignedTo || '',
    priority: initialData?.priority || 'medium' as Priority,
    status: initialData?.status || 'todo' as Status,
    deadline: initialData?.deadline || '',
    projectId: initialData?.projectId || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="label">Task Title</label>
        <input
          type="text"
          id="title"
          className="input"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="label">Description</label>
        <textarea
          id="description"
          className="input"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="project" className="label">Project</label>
        <select
          id="project"
          className="input"
          value={formData.projectId}
          onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
          required
        >
          <option value="">Select Project</option>
          {state.projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="assignedTo" className="label">Assigned To</label>
        <select
          id="assignedTo"
          className="input"
          value={formData.assignedTo}
          onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
          required
        >
          <option value="">Select Team Member</option>
          {state.team.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className="label">Priority</label>
          <select
            id="priority"
            className="input"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="deadline" className="label">Deadline</label>
          <input
            type="date"
            id="deadline"
            className="input"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            required
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        {initialData ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
}
import React from 'react';
import { Project, ProjectStatus } from '../../types';

interface ProjectFormProps {
  onSubmit: (project: Omit<Project, 'id'>) => void;
  initialData?: Project;
}

export default function ProjectForm({ onSubmit, initialData }: ProjectFormProps) {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    status: initialData?.status || 'active' as ProjectStatus,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="label">Project Name</label>
        <input
          type="text"
          id="name"
          className="input"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="label">Start Date</label>
          <input
            type="date"
            id="startDate"
            className="input"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate" className="label">End Date</label>
          <input
            type="date"
            id="endDate"
            className="input"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="status" className="label">Status</label>
        <select
          id="status"
          className="input"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="on-hold">On Hold</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        {initialData ? 'Update Project' : 'Create Project'}
      </button>
    </form>
  );
}
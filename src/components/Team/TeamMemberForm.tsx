import React, { useState } from 'react';
import { TeamMember } from '../../types';
import { useAuth } from '../../hooks/useAuth';

interface TeamMemberFormProps {
  onSubmit: (member: Omit<TeamMember, 'id'>) => void;
  initialData?: TeamMember;
}

export default function TeamMemberForm({ onSubmit, initialData }: TeamMemberFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    email: initialData?.email || '',
    password: '',
    avatar: initialData?.avatar || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const memberData = {
      ...formData,
      avatar: formData.avatar || `https://ui-avatars.com/api/?name=${formData.name}`,
    };
    onSubmit(memberData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="label">Name</label>
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
        <label htmlFor="role" className="label">Role</label>
        <input
          type="text"
          id="role"
          className="input"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="label">Email</label>
        <input
          type="email"
          id="email"
          className="input"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      {!initialData && user?.email === 'admin@example.com' && (
        <div>
          <label htmlFor="password" className="label">Initial Password</label>
          <input
            type="password"
            id="password"
            className="input"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
      )}
      <button type="submit" className="btn btn-primary">
        {initialData ? 'Update Member' : 'Add Member'}
      </button>
    </form>
  );
}
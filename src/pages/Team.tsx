import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../hooks/useAuth';
import TeamMemberForm from '../components/Team/TeamMemberForm';
import TeamDashboard from '../components/Team/TeamDashboard';
import { Plus, Mail, Trash2, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Team() {
  const { state, dispatch } = useApp();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);

  const isAdmin = user?.email === 'admin@example.com';

  const handleCreateMember = (memberData: any) => {
    dispatch({
      type: 'ADD_TEAM_MEMBER',
      payload: { ...memberData, id: crypto.randomUUID() },
    });
    setShowForm(false);
  };

  const handleDeleteMember = (id: string) => {
    dispatch({ type: 'DELETE_TEAM_MEMBER', payload: id });
  };

  if (!isAdmin) {
    return <TeamDashboard />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Member
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <TeamMemberForm onSubmit={handleCreateMember} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.team.map((member) => (
          <div
            key={member.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex items-center space-x-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {member.role}
                </p>
                <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <Mail className="w-4 h-4 mr-1" />
                  {member.email}
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Link
                  to="/settings"
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Settings className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
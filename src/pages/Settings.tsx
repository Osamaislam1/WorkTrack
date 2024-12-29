import React from 'react';
import ChangePasswordForm from '../components/Settings/ChangePasswordForm';

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      <ChangePasswordForm />
    </div>
  );
}
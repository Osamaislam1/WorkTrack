import React from 'react';
import { useApp } from '../context/AppContext';
import ProjectCard from '../components/Dashboard/ProjectCard';
import TaskList from '../components/Dashboard/TaskList';
import { BarChart, Users, CheckSquare } from 'lucide-react';

export default function Dashboard() {
  const { state } = useApp();
  const { projects, tasks, team } = state;

  const activeProjects = projects.filter((project) => project.status === 'active');
  const recentTasks = tasks.slice(0, 5);

  const stats = [
    {
      title: 'Total Projects',
      value: projects.length,
      icon: BarChart,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Tasks',
      value: tasks.filter((task) => task.status !== 'done').length,
      icon: CheckSquare,
      color: 'bg-green-500',
    },
    {
      title: 'Team Members',
      value: team.length,
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Active Projects
          </h2>
          <div className="grid gap-6">
            {activeProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Recent Tasks
          </h2>
          <TaskList tasks={recentTasks} />
        </div>
      </div>
    </div>
  );
}
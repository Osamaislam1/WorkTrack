export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'done';
export type ProjectStatus = 'active' | 'completed' | 'on-hold';
export type Role = 'admin' | 'member';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  priority: Priority;
  status: Status;
  deadline: string;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  password?: string;
}
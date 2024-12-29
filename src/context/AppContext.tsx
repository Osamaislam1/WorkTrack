import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Project, Task, TeamMember } from '../types';

interface AppState {
  projects: Project[];
  tasks: Task[];
  team: TeamMember[];
}

type Action =
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_TEAM'; payload: TeamMember[] }
  | { type: 'ADD_TEAM_MEMBER'; payload: TeamMember }
  | { type: 'UPDATE_TEAM_MEMBER'; payload: TeamMember }
  | { type: 'DELETE_TEAM_MEMBER'; payload: string };

const initialState: AppState = {
  projects: [],
  tasks: [],
  team: [],
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.id ? action.payload : project
        ),
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== action.payload),
      };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'SET_TEAM':
      return { ...state, team: action.payload };
    case 'ADD_TEAM_MEMBER':
      return { ...state, team: [...state.team, action.payload] };
    case 'UPDATE_TEAM_MEMBER':
      return {
        ...state,
        team: state.team.map((member) =>
          member.id === action.payload.id ? action.payload : member
        ),
      };
    case 'DELETE_TEAM_MEMBER':
      return {
        ...state,
        team: state.team.filter((member) => member.id !== action.payload),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const loadData = () => {
      const projects = localStorage.getItem('projects');
      const tasks = localStorage.getItem('tasks');
      const team = localStorage.getItem('team');

      if (projects) dispatch({ type: 'SET_PROJECTS', payload: JSON.parse(projects) });
      if (tasks) dispatch({ type: 'SET_TASKS', payload: JSON.parse(tasks) });
      if (team) dispatch({ type: 'SET_TEAM', payload: JSON.parse(team) });
    };

    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(state.projects));
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
    localStorage.setItem('team', JSON.stringify(state.team));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task, Status } from '../../types';
import KanbanColumn from './KanbanColumn';
import KanbanTask from './KanbanTask';
import { useApp } from '../../context/AppContext';
import { createPortal } from 'react-dom';

const columns: Status[] = ['todo', 'in-progress', 'done'];

export default function KanbanBoard() {
  const { state, dispatch } = useApp();
  const [activeTask, setActiveTask] = React.useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = state.tasks.find((t) => t.id === event.active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const task = state.tasks.find((t) => t.id === active.id);
      if (task) {
        const newStatus = over.id as Status;
        dispatch({
          type: 'UPDATE_TASK',
          payload: { ...task, status: newStatus },
        });
      }
    }
    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((status) => (
          <SortableContext
            key={status}
            items={state.tasks.filter((task) => task.status === status)}
            strategy={verticalListSortingStrategy}
          >
            <KanbanColumn
              status={status}
              tasks={state.tasks.filter((task) => task.status === status)}
            />
          </SortableContext>
        ))}
      </div>
      {createPortal(
        <DragOverlay>
          {activeTask ? <KanbanTask task={activeTask} isDragging /> : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
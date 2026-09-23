import { useState } from 'react';
import { TaskCard } from './TaskCard';

export function TaskList({ tasks, onToggle, onDelete }) {
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    }
    if (filter === 'incomplete') {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="task-list-wrapper">
      <div className="filter-controls">
        <span className="filter-label">Filter:</span>
        <button
          type="button"
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({tasks.length})
        </button>
        <button
          type="button"
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({tasks.filter((t) => t.completed).length})
        </button>
        <button
          type="button"
          className={`filter-btn ${filter === 'incomplete' ? 'active' : ''}`}
          onClick={() => setFilter('incomplete')}
        >
          Incomplete ({tasks.filter((t) => !t.completed).length})
        </button>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="no-tasks-message">No tasks found</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

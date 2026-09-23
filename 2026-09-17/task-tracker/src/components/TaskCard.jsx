import { Link } from 'react-router-dom';

export function TaskCard({ task, onToggle, onDelete }) {
  const statusLabel = task.completed ? 'Completed' : 'Not completed';

  return (
    <div className={`task-card ${task.completed ? 'task-completed' : ''}`}>
      <div className="task-card-content">
        <h3 className="task-title">
          <Link to={`/tasks/${task.id}`} className="task-title-link">
            {task.title}
          </Link>
        </h3>
        <p className="task-status">
          Status:{' '}
          <span
            className={`status-badge ${task.completed ? 'status-completed' : 'status-pending'}`}
          >
            {statusLabel}
          </span>
        </p>
      </div>

      <div className="task-actions">
        {onToggle && (
          <button
            type="button"
            className="btn btn-toggle"
            onClick={() => onToggle(task.id)}
          >
            {task.completed ? 'Mark Not Completed' : 'Mark Completed'}
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            className="btn btn-delete"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

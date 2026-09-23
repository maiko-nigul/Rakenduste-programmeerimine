import { Link, useParams } from 'react-router-dom';
import { PageSection } from '../components/PageSection';

export function TaskDetailPage({ tasks, onToggle }) {
  const { taskId } = useParams();
  const parsedId = Number(taskId);

  const task = tasks.find((t) => t.id === parsedId);

  if (!task) {
    return (
      <PageSection title="Task Not Found">
        <div className="not-found-card">
          <p className="error-text">
            No task found with ID &ldquo;{taskId}&rdquo;.
          </p>
          <Link to="/tasks" className="btn btn-secondary">
            &larr; Back to Task List
          </Link>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection title={`Task #${task.id} Details`}>
      <div className="task-detail-card">
        <h3 className="detail-title">{task.title}</h3>
        <p className="detail-row">
          <strong>Identifier:</strong> {task.id}
        </p>
        <p className="detail-row">
          <strong>Status:</strong>{' '}
          <span
            className={`status-badge ${task.completed ? 'status-completed' : 'status-pending'}`}
          >
            {task.completed ? 'Completed' : 'Not completed'}
          </span>
        </p>

        <div className="detail-actions">
          {onToggle && (
            <button
              type="button"
              className="btn btn-toggle"
              onClick={() => onToggle(task.id)}
            >
              {task.completed ? 'Mark Not Completed' : 'Mark Completed'}
            </button>
          )}
          <Link to="/tasks" className="btn btn-secondary">
            &larr; Back to Tasks
          </Link>
        </div>
      </div>
    </PageSection>
  );
}

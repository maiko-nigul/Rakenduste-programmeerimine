import { useState } from 'react';

export function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Task title cannot be empty.');
      return;
    }

    onAddTask(trimmedTitle);
    setTitle('');
    setError('');
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="task-title-input" className="form-label">
          Task Title
        </label>
        <div className="form-input-row">
          <input
            id="task-title-input"
            type="text"
            className={`form-input ${error ? 'input-error' : ''}`}
            placeholder="What needs to be done?"
            value={title}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
        {error && <p className="form-error-message">{error}</p>}
      </div>
    </form>
  );
}

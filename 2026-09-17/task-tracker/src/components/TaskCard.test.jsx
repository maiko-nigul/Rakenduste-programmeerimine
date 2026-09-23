import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { TaskCard } from './TaskCard';

describe('TaskCard Component', () => {
  const mockTask = {
    id: 1,
    title: 'Learn JSX',
    completed: false,
  };

  it('renders the task title', () => {
    render(
      <MemoryRouter>
        <TaskCard task={mockTask} onToggle={vi.fn()} onDelete={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Learn JSX')).toBeInTheDocument();
  });

  it("calls the toggle callback with the task's ID when toggle button is clicked", async () => {
    const handleToggle = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <TaskCard task={mockTask} onToggle={handleToggle} onDelete={vi.fn()} />
      </MemoryRouter>,
    );

    const toggleButton = screen.getByRole('button', {
      name: /mark completed/i,
    });
    await user.click(toggleButton);

    expect(handleToggle).toHaveBeenCalledTimes(1);
    expect(handleToggle).toHaveBeenCalledWith(1);
  });
});

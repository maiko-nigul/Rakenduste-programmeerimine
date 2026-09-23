import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TaskDetailPage } from './pages/TaskDetailPage';
import { TasksPage } from './pages/TasksPage';
import { getTasks } from './services/taskApi';
import './App.css';

export function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let isCancelled = false;

    async function loadTasks() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getTasks(controller.signal);
        if (!isCancelled) {
          setTasks(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (err.name !== 'AbortError' && !isCancelled) {
          setError(err.message || 'Failed to fetch tasks.');
          setIsLoading(false);
        }
      }
    }

    loadTasks();

    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, []);

  const handleAddTask = (title) => {
    setTasks((prevTasks) => {
      const nextId =
        prevTasks.length > 0 ? Math.max(...prevTasks.map((t) => t.id)) + 1 : 1;
      const newTask = {
        id: nextId,
        title,
        completed: false,
      };
      return [...prevTasks, newTask];
    });
  };

  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <HashRouter>
      <div className="app-container">
        <Header />

        <main className="main-content">
          {isLoading && (
            <div className="status-notice loading">
              <p>Loading tasks, please wait...</p>
            </div>
          )}

          {error && (
            <div className="status-notice error">
              <p>Error: {error}</p>
            </div>
          )}

          {!isLoading && !error && (
            <Routes>
              <Route path="/" element={<HomePage tasks={tasks} />} />
              <Route
                path="/tasks"
                element={
                  <TasksPage
                    tasks={tasks}
                    onAddTask={handleAddTask}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                  />
                }
              />
              <Route
                path="/tasks/:taskId"
                element={
                  <TaskDetailPage tasks={tasks} onToggle={handleToggleTask} />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          )}
        </main>

        <footer className="app-footer">
          <p>Task Tracker &bull; Lesson #2 Group Learning Assignments</p>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;

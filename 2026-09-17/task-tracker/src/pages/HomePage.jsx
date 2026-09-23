import { Link } from 'react-router-dom';
import { PageSection } from '../components/PageSection';

export function HomePage({ tasks }) {
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="home-page">
      <PageSection title="Welcome to Task Tracker">
        <p className="welcome-text">
          A modern task tracking application built with React, Vite, and React
          Router.
        </p>

        <div className="stats-grid">
          <div className="stat-card">
            <h4>Total Tasks</h4>
            <p className="stat-number">{tasks.length}</p>
          </div>
          <div className="stat-card">
            <h4>Completed</h4>
            <p className="stat-number stat-completed">{completedCount}</p>
          </div>
          <div className="stat-card">
            <h4>Pending</h4>
            <p className="stat-number stat-pending">{pendingCount}</p>
          </div>
        </div>

        <div className="cta-container">
          <Link to="/tasks" className="btn btn-primary btn-large">
            View & Manage Tasks &rarr;
          </Link>
        </div>
      </PageSection>
    </div>
  );
}

import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <h1 className="header-title">Task Tracker</h1>
        <nav className="header-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Tasks
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

import { Link } from 'react-router-dom';
import { PageSection } from '../components/PageSection';

export function NotFoundPage() {
  return (
    <PageSection title="404 - Page Not Found">
      <div className="not-found-card">
        <p className="error-text">
          The page you are looking for does not exist.
        </p>
        <Link to="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    </PageSection>
  );
}

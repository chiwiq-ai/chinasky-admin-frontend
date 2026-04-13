import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, initializing } = useAdminAuth();
  const location = useLocation();

  if (initializing) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#9ca3af', fontSize: 14 }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

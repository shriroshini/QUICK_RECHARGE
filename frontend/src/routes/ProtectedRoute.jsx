import { Navigate } from 'react-router-dom';
import { useAuthIntegrated } from '../context/AuthContextIntegrated';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuthIntegrated();
  
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
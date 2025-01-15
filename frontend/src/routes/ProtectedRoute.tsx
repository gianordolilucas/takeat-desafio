import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

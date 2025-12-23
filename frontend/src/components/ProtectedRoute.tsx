import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>; // Or a proper spinner
    }

    return user ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;

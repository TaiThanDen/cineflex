import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Auth from '@/context/Auth';

interface FastAuthCheckProps {
    children: React.ReactNode;
    redirectTo?: string;
    requireAuth?: boolean;
}

const FastAuthCheck = ({
    children,
    redirectTo = '/login',
    requireAuth = true
}: FastAuthCheckProps) => {
    const { auth } = useContext(Auth);
    const isLoggedIn = Boolean(auth && auth.trim() !== '');

    if (requireAuth && !isLoggedIn) {
        return <Navigate to={redirectTo} replace />;
    }

    if (!requireAuth && isLoggedIn) {
        return <Navigate to="/home" replace />;
    }

    return <>{children}</>;
};

export default FastAuthCheck;

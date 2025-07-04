import Auth from "@/context/Auth";
import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router";

interface props {
    children: ReactNode
    type?: 'required' | 'no'
}

const AuthGuard = ({ children, type = 'required' } : props) => {
    const { auth } = useContext(Auth);

    if (type === 'required') {
        return auth !== '' ? children : <Navigate to="/login"/>;
    };
    if (type === 'no') {
        return auth === '' ? children : <Navigate to="/home" />;
    }
}

export default AuthGuard;
import Auth from "@/context/Auth";
import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router";

interface props {
    children: ReactNode
    type?: 'required' | 'no',
    fallBackRequired?: ReactNode,
    fallBackNo?: ReactNode
}

const AuthGuard = ({ children, type = 'required', fallBackRequired = <Navigate to="/login"/>, fallBackNo = <Navigate to="/home" /> } : props) => {
    const { auth } = useContext(Auth);

    if (type === 'required') {
        return auth !== '' ? children : fallBackRequired;
    };
    if (type === 'no') {
        return auth === '' ? children : fallBackNo;
    }
}

export default AuthGuard;
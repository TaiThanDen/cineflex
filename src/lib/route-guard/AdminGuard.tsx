import { useQuery } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { Navigate } from "react-router";
import { getUserRole } from "../api";
import ApiException from "../exceptions/ApiException";

interface props {
    children: ReactNode,
    allowed: (0 | 1 | 2)[],
    fallBack?: ReactNode
}

const AdminGuard = ({ children, allowed, fallBack = <Navigate to="/home" /> } : props) => {
    const result = useQuery({
        queryKey: ["user-role"],
        queryFn: () => getUserRole()
    });



    if (result.isLoading) return <></>

    if (result.isError) {
        if (result.error instanceof ApiException && result.error.status === 401) {
            return fallBack
        }
    }

    if (allowed.includes(result.data! as 0 | 1 | 2)) {
        return children
    }

    return <Navigate to="/home" />
}

export default AdminGuard
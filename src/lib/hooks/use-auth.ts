import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Auth from '@/context/Auth';
import { getUserRole } from '@/lib/api';

export const useAuthAndRole = () => {
    const { auth } = useContext(Auth);
    const isLoggedIn = Boolean(auth && auth.trim() !== '');

    const roleQuery = useQuery({
        queryKey: ['user-role'],
        queryFn: () => getUserRole(),
        enabled: isLoggedIn,
        staleTime: 5 * 60 * 1000, // Cache 5 phút
        gcTime: 10 * 60 * 1000, // Giữ cache 10 phút
        retry: 1
    });

    return {
        isLoggedIn,
        auth,
        role: roleQuery.data,
        isLoadingRole: roleQuery.isLoading,
        isErrorRole: roleQuery.isError,
        roleError: roleQuery.error
    };
};

export const useIsAdmin = () => {
    const { isLoggedIn, role, isLoadingRole } = useAuthAndRole();
    return {
        isAdmin: isLoggedIn && role === 2,
        isModerator: isLoggedIn && (role === 1 || role === 2),
        isUser: isLoggedIn && role === 0,
        isLoadingRole
    };
};

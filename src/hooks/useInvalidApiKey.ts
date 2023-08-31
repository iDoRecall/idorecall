import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUserState } from '../states/user';

export const useInvalidApiKey = (): void => {
    const navigate = useNavigate();
    const { user } = useUserState();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user]);
};

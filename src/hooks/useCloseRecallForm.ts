import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useRecallFormState } from '../states/recall-form-state';

export const useCloseRecallForm = (): void => {
    const navigate = useNavigate();
    const { isFromClosed, setFormClosed } = useRecallFormState();
    const { setFormState } = useRecallFormState();

    useEffect(() => {
        setFormState(true);

        if (isFromClosed) {
            navigate('/');
        }

        return () => {
            setFormClosed(false);
            setFormState(false);
        };
    }, [isFromClosed]);
};

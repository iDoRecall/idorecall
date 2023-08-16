import { RefObject, useEffect } from 'react';

export const useClickOutside = (
    ref: RefObject<HTMLElement>,
    onClickOutside: () => any,
): void => {
    const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            onClickOutside();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [ref]);
};

import { useEffect, RefObject } from 'react';

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
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
};

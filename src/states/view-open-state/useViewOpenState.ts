import { create } from 'zustand';

interface ViewOpenState {
    isOpened: boolean;
    setIsOpened: (flag: boolean) => void;
}

export const useViewOpenState = create<ViewOpenState>((set) => ({
    isOpened: false,
    setIsOpened: (isOpened) => {
        set({ isOpened });
    },
}));

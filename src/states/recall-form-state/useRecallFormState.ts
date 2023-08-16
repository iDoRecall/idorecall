import { create } from 'zustand';

interface RecallFormState {
    isFromClosed: boolean;
    setFormClosed: (isFromClosed: boolean) => void;
}

export const useRecallFormState = create<RecallFormState>((set) => ({
    isFromClosed: false,
    setFormClosed: (isFromClosed) => {
        set({ isFromClosed });
    },
}));

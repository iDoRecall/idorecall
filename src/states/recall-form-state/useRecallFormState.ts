import { create } from 'zustand';

interface RecallFormState {
    formState: boolean;
    isFromClosed: boolean;
    setFormState: (formState: boolean) => void;
    setFormClosed: (isFromClosed: boolean) => void;
}

export const useRecallFormState = create<RecallFormState>((set) => ({
    formState: false,
    isFromClosed: false,
    setFormState: (formState) => {
        set({ formState });
    },
    setFormClosed: (isFromClosed) => {
        set({ isFromClosed });
    },
}));

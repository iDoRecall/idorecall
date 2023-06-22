import { create } from 'zustand';

interface CreateRecallState {
    answer: string | null;
    setAnswer: (answer: string | null) => void;
}

export const useCreateRecallState = create<CreateRecallState>((set) => ({
    answer: null,
    setAnswer: (answer) => {
        set({ answer });
    },
}));

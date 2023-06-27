import { create } from 'zustand';

interface FormAnswerState {
    answer: string | null;
    linkId: string | null;
    setAnswer: (answer: string | null) => void;
    setLinkId: (linkId: string) => void;
}

export const useLaunchCreatingState = create<FormAnswerState>((set) => ({
    answer: null,
    linkId: null,
    setAnswer: (answer) => {
        set({ answer });
    },
    setLinkId: (linkId) => {
        set({ linkId });
    },
}));

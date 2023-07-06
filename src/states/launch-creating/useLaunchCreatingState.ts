import { create } from 'zustand';

interface FormAnswerState {
    answer: string | null;
    linkId: string | null;
    setAnswer: (answer: string | null) => void;
    setLinkId: (linkId: string) => void;
    reset: () => void;
}

export const useLaunchCreatingState = create<FormAnswerState>((set) => ({
    answer: null,
    linkId: null,
    activeEditor: null,
    setAnswer: (answer) => {
        set({ answer });
    },
    setLinkId: (linkId) => {
        set({ linkId });
    },
    reset: () => {
        set({ answer: null, linkId: null });
    },
}));

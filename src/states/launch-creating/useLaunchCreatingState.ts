import { create } from 'zustand';

interface FormAnswerState {
    answer: string | null;
    question: string | null;
    linkId: string | null;
    setFields: (fields: {
        answer: string | null;
        question: string | null;
    }) => void;
    setLinkId: (linkId: string) => void;
    reset: () => void;
}

export const useLaunchCreatingState = create<FormAnswerState>((set) => ({
    answer: null,
    question: null,
    linkId: null,
    activeEditor: null,
    setFields: (fields) => {
        set(fields);
    },
    setLinkId: (linkId) => {
        set({ linkId });
    },
    reset: () => {
        set({ answer: null, question: null, linkId: null });
    },
}));

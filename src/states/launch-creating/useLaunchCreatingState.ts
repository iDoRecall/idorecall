import { create } from 'zustand';
import { Editor } from 'obsidian';

interface FormAnswerState {
    answer: string | null;
    linkId: string | null;
    activeEditor: Editor | null;
    setAnswer: (answer: string | null) => void;
    setLinkId: (linkId: string) => void;
    setActiveEditor: (editor: Editor) => void;
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
    setActiveEditor: (activeEditor) => {
        set({ activeEditor });
    },
    reset: () => {
        set({ answer: null, linkId: null, activeEditor: null });
    },
}));

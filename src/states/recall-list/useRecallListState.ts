import { Recall } from '../../models';
import { create } from 'zustand';
import { RecallListService } from '../../api/recall-list';

interface RecallListState {
    recallList: Recall[] | null;
    isLoading: boolean;
    loadRecallList: (basename: string) => Promise<void>;
}

export const useRecallListState = create<RecallListState>((set) => ({
    recallList: null,
    isLoading: false,
    loadRecallList: async (basename) => {
        set({ isLoading: true });
        const response = await RecallListService.instance.getRecalls(basename);
        set({ recallList: response, isLoading: false });
    },
}));

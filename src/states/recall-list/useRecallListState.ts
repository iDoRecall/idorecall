import { Recall } from '../../models';
import { create } from 'zustand';
import { RecallListService } from '../../api/recall-list';

interface RecallListState {
    recallList: Recall[];
    isLoading: boolean;
    loadRecallList: (basename: string) => Promise<void>;
}

export const useRecallListState = create<RecallListState>((set) => ({
    recallList: [],
    isLoading: false,
    // TODO: In recall list after loading validate activeEditor text to be equal with links in recall sources. Not equal links from editor must be deleted
    loadRecallList: async (basename) => {
        set({ isLoading: true });
        const response = await RecallListService.instance.getRecalls(basename);
        set({ recallList: response, isLoading: false });
    },
}));

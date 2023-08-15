import { Recall } from '../../models';
import { create } from 'zustand';
import { RecallListService } from '../../api/recall-list';

interface RecallListState {
    recallList: Recall[];
    isLoading: boolean;
    loadRecallList: (ctime: number) => Promise<void>;
    setRecallList: (recallList: Recall[]) => void;
}

export const useRecallListState = create<RecallListState>((set) => ({
    recallList: [],
    isLoading: false,
    // TODO: In recall list after loading validate activeEditor text to be equal with links in recall sources. Not equal links from editor must be deleted
    loadRecallList: async (ctime) => {
        set({ isLoading: true });
        const response = await RecallListService.instance.getRecalls(ctime);
        set({ recallList: response, isLoading: false });
    },
    setRecallList: (recallList) => {
        set({ recallList });
    },
}));

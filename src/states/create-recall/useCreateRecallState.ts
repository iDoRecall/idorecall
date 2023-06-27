import { create } from 'zustand';
import { Recall } from '../../models';
import { CreateRecallService } from '../../services';

interface CreateRecallState {
    isLoading: boolean;
    saveRecall: (recall: Recall) => Promise<boolean>;
}

export const useCreateRecallState = create<CreateRecallState>((set) => ({
    isLoading: false,
    saveRecall: async (recall) => {
        set({ isLoading: true });
        const result = await CreateRecallService.instance
            .create(recall)
            .catch(() => false);
        set({ isLoading: false });

        return result;
    },
}));

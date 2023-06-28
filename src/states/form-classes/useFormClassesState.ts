import { create } from 'zustand';
import { RestService } from '../../api/restService';
import { ShareClasses } from '../../models';

interface FormClassesState {
    classes: ShareClasses[];
    isLoading: boolean;
    loadClassesByQuery: (query: string) => Promise<void>;
}

export const useFormClassesState = create<FormClassesState>((set) => ({
    classes: [],
    isLoading: false,
    loadClassesByQuery: async (query) => {
        set({ isLoading: true });
        const response = await RestService.instance.get<ShareClasses[]>(
            'obsidian/sharing-list',
            { params: { query } },
        );
        set({ classes: response, isLoading: false });
    },
}));

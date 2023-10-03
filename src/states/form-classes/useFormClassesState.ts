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

        const response = await RestService.instance.requestWrapper<
            ShareClasses[]
        >(`obsidian/sharing-list?query=${query}`, 'GET');

        set({ classes: response, isLoading: false });
    },
}));

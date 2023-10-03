import { create } from 'zustand';
import { RestService } from '../../api/restService';
import { Tag } from '../../models';

interface FormTagsState {
    tags: Tag[];
    isLoading: boolean;
    loadTagsByQuery: (query: string) => Promise<void>;
}

export const useFormTagsState = create<FormTagsState>((set) => ({
    tags: [],
    isLoading: false,
    loadTagsByQuery: async (query) => {
        set({ isLoading: true });

        const response = await RestService.instance.requestWrapper<Tag[]>(
            `obsidian/tags?query=${query}`,
            'GET',
        );

        set({ tags: response, isLoading: false });
    },
}));

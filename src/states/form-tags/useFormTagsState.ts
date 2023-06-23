import { create } from 'zustand';
import { RestService } from '../../api/restService';
import { Tag } from '@lezer/highlight';

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
        const response = await RestService.instance.get<Tag[]>(
            'obsidian/tags',
            { params: { query } },
        );
        set({ tags: response, isLoading: false });
    },
}));

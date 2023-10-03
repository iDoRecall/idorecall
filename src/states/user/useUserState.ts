import { create } from 'zustand';
import { User } from '../../models';
import { RestService } from '../../api/restService';

interface UserState {
    user: User | null;
    isLoading: boolean;
    loadUser: () => Promise<void>;
    resetUser: () => void;
}

export const useUserState = create<UserState>((set) => ({
    user: null,
    isLoading: false,
    loadUser: async () => {
        set({ isLoading: true });

        const user = await RestService.instance.requestWrapper<User>(
            'obsidian/me',
            'GET',
        );

        set({ user, isLoading: false });
    },
    resetUser: () => {
        set({ user: null, isLoading: false });
    },
}));

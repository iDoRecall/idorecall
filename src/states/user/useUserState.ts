import { User } from '../../models';
import { create } from 'zustand';
import { RestService } from '../../api/restService';

interface UserState {
    user: User | null;
    isLoading: boolean;
    loadUser: () => Promise<void>;
}

export const useUserState = create<UserState>((set) => ({
    user: null,
    isLoading: false,
    loadUser: async () => {
        set({ isLoading: true });
        const response = await RestService.instance.get<User>('obsidian/me');
        set({ user: response, isLoading: false });
    },
}));

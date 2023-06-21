import { User } from '../models';
import { create } from 'zustand';
import { fakeUser } from '../mock/fakeUser';

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
        const response = await Promise.resolve(fakeUser);
        set({ user: response, isLoading: false });
    },
}));

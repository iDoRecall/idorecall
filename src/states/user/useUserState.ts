import { create } from 'zustand';
import { User } from '../../models';
import { RestService } from '../../api/restService';
import { NoticeService } from '../../services';

interface UserState {
    user: User | null;
    isLoading: boolean;
    loadUser: () => void;
    resetUser: () => void;
}

export const useUserState = create<UserState>((set) => ({
    user: null,
    isLoading: false,
    loadUser: () => {
        set({ isLoading: true });

        RestService.instance
            .get<User>('obsidian/me')
            .then((user) => {
                set({ user, isLoading: false });
            })
            .catch(() => {
                set({ user: null, isLoading: false });
                NoticeService.instance.notice('Key is not valid');
            });
    },
    resetUser: () => {
        set({ user: null });
    },
}));

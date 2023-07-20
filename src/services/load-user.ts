import { useUserState } from '../states/user';

export class LoadUserService {
    private static _instance: LoadUserService;

    public loadUser(): void {
        void useUserState.getState().loadUser();
    }

    public get isUserExist(): boolean {
        return !!useUserState.getState().user;
    }

    public static get instance(): LoadUserService {
        if (!LoadUserService._instance) {
            LoadUserService._instance = new LoadUserService();
        }
        return LoadUserService._instance;
    }
}

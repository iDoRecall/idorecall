import { useUserState } from '../states/user';
import { usePluginState } from '../states/plugin';
import { isValidApiKey } from '../utils/is-valid-api-key';

export class LoadUserService {
    private static _instance: LoadUserService;

    public loadUser(): void {
        if (!this.isUserExist && this.isValidApiKey) {
            void useUserState.getState().loadUser();
        }
    }

    private get isUserExist(): boolean {
        return !!useUserState.getState().user;
    }

    private get isValidApiKey(): boolean {
        return isValidApiKey(usePluginState.getState().plugin.settings.apiKey);
    }

    public static get instance(): LoadUserService {
        if (!LoadUserService._instance) {
            LoadUserService._instance = new LoadUserService();
        }
        return LoadUserService._instance;
    }
}

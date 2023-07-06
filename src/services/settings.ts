import { IDRPluginSettings } from '../models';
import { usePluginState } from '../states/plugin';
import { useUserState } from '../states/user';

export class SettingsService {
    private static _instance: SettingsService;

    public setSettings(settings: IDRPluginSettings): void {
        const oldApiKey = usePluginState.getState().settings?.apiKey;

        if (oldApiKey !== settings.apiKey && settings.apiKey && !!oldApiKey) {
            void useUserState.getState().loadUser();
        }

        if (!!oldApiKey && !settings.apiKey) {
            useUserState.getState().resetUser();
        }
        usePluginState.getState().setPluginSettings(settings);
    }

    public static get instance(): SettingsService {
        if (!SettingsService._instance) {
            SettingsService._instance = new SettingsService();
        }
        return SettingsService._instance;
    }
}

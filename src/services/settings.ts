import { IDRPluginSettings } from '../models';
import { usePluginState } from '../states/plugin';
import { useUserState } from '../states/user';
import { isValidApiKey } from '../utils/is-valid-api-key';
import { NoticeService } from './notice';

export class SettingsService {
    private static _instance: SettingsService;

    public setSettings(settings: IDRPluginSettings): void {
        if (isValidApiKey(settings.apiKey)) {
            usePluginState.getState().setPluginSettings(settings);
            useUserState.getState().loadUser();
        }

        if (!isValidApiKey(settings.apiKey) && !!settings.apiKey) {
            usePluginState.getState().setPluginSettings(settings);
            useUserState.getState().resetUser();

            NoticeService.instance.notice('Key is not valid');
        }
    }

    public static get instance(): SettingsService {
        if (!SettingsService._instance) {
            SettingsService._instance = new SettingsService();
        }
        return SettingsService._instance;
    }
}

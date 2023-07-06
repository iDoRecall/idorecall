import IDRPlugin from '../main';
import { usePluginState } from '../states/plugin';

export class PluginService {
    private static _instance: PluginService;

    public setPlugin(plugin: IDRPlugin): void {
        usePluginState.getState().setPlugin(plugin);
    }

    public static get instance(): PluginService {
        if (!PluginService._instance) {
            PluginService._instance = new PluginService();
        }
        return PluginService._instance;
    }
}

import { create } from 'zustand';
import IDRPlugin from '../../main';

interface PluginState {
    plugin: IDRPlugin | null;
    setPlugin: (plugin: IDRPlugin) => Promise<void>;
}

export const usePluginState = create<PluginState>((set) => ({
    plugin: null,
    setPlugin: async (plugin) => {
        set({ plugin });
    },
}));

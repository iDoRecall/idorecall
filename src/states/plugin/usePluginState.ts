import { create } from 'zustand';
import IDRPlugin from '../../main';

interface PluginState {
    plugin: IDRPlugin | null;
    setPlugin: (plugin: IDRPlugin) => void;
}

export const usePluginState = create<PluginState>((set) => ({
    plugin: null,
    setPlugin: (plugin) => {
        set({ plugin });
    },
}));

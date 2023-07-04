import { create } from 'zustand';
import IDRPlugin from '../../main';
import { IDRPluginSettings } from '../../models';

interface PluginState {
    plugin: IDRPlugin | null;
    settings: IDRPluginSettings | null;
    setPlugin: (plugin: IDRPlugin) => void;
    setPluginSettings: (plugin: IDRPluginSettings) => void;
}

export const usePluginState = create<PluginState>((set) => ({
    plugin: null,
    settings: null,
    setPlugin: (plugin) => {
        set({ plugin });
    },
    setPluginSettings: (settings) => {
        set({ settings });
    },
}));

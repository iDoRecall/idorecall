import { create } from 'zustand';
import IDRPlugin from '../../main';
import { IDRPluginSettings } from '../../models';
import { Editor } from 'obsidian';

interface PluginState {
    plugin: IDRPlugin | null;
    settings: IDRPluginSettings | null;
    activeEditor: Editor | null;
    setPlugin: (plugin: IDRPlugin) => void;
    setPluginSettings: (plugin: IDRPluginSettings) => void;
    setActiveEditor: (activeEditor: Editor) => void;
}

export const usePluginState = create<PluginState>((set) => ({
    plugin: null,
    settings: null,
    activeEditor: null,
    setPlugin: (plugin) => {
        set({ plugin });
    },
    setPluginSettings: (settings) => {
        set({ settings });
    },
    setActiveEditor: (activeEditor) => {
        set({ activeEditor });
    },
}));

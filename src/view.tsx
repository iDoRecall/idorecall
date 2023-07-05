import { ItemView, WorkspaceLeaf } from 'obsidian';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import IDRPlugin from './main';
import { setDarkTheme } from './utils/setDarkTheme';
import { ActiveEditorService, SettingsService } from './services';
import { statesFacade } from './states/statesFacade';

export default class IDRView extends ItemView {
    constructor(leaf: WorkspaceLeaf, plugin: IDRPlugin) {
        super(leaf);
        // for styles separation form another leafs
        this.containerEl.children[1].id = 'idr-app';
        setTimeout(() => {
            setDarkTheme(plugin.settings.isDarkTheme);
        });

        SettingsService.instance.setSettings(plugin.settings);
        if (plugin.app.workspace.activeEditor?.editor) {
            ActiveEditorService.instance.setActiveEditor(
                plugin.app.workspace.activeEditor?.editor,
            );
        }

        void statesFacade.loadUser();
    }

    getDisplayText() {
        return 'IDoRecall';
    }

    getIcon() {
        return 'idr-icon';
    }

    getViewType() {
        return 'idr-view';
    }

    async onOpen() {
        // TODO: make app with strict width
        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            this.containerEl.children[1],
        );
    }

    async onClose() {
        ReactDOM.unmountComponentAtNode(this.containerEl.children[1]);
    }
}

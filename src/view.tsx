import { ItemView, WorkspaceLeaf } from 'obsidian';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import IDRPlugin from './main';
import { setDarkTheme } from './utils/setDarkTheme';
import { useRecallListState } from './states/recall-list';

export default class IDRView extends ItemView {
    constructor(leaf: WorkspaceLeaf, plugin: IDRPlugin) {
        super(leaf);
        // for styles separation form another leafs
        this.containerEl.children[1].id = 'idr-app';
        setTimeout(() => {
            setDarkTheme(plugin.settings.isDarkTheme);
        });
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
        const basename = this.app.workspace.getActiveFile()?.basename;
        if (basename) {
            void useRecallListState.getState().loadRecallList(basename);
        }

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

import { ItemView, WorkspaceLeaf } from 'obsidian';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import IDRPlugin from './main';
import { setDarkTheme } from './utils/setDarkTheme';

export default class IDRView extends ItemView {
    root = createRoot(this.containerEl.children[1]);

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
        // TODO: we need current opened note to get recalls list
        console.log(
            'Current note -> ',
            this.app.workspace.getActiveFile()?.basename,
        );
        this.root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
        );
    }

    async onClose() {
        console.log('onClose');
        this.root.unmount();
    }
}

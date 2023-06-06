import { ItemView, WorkspaceLeaf } from 'obsidian';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ReactView } from './ReactView';

export default class IDRView extends ItemView {
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    root = createRoot(this.containerEl.children[1]);

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
        console.log('onOpen');
        this.root.render(
            <React.StrictMode>
                <ReactView/>
            </React.StrictMode>,
        );
    }

    async onClose() {
        console.log('onClose');
        this.root.unmount();
    }
}

import { ItemView } from 'obsidian';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

export default class IDRView extends ItemView {
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
                <App />
            </React.StrictMode>,
        );
    }

    async onClose() {
        console.log('onClose');
        this.root.unmount();
    }
}

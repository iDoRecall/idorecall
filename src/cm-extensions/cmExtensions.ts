import IDRPlugin from 'main';
import { cursorTooltip } from './inlineStylerView/inlineStyler';
import { toggleMarkExtension } from './inlineStylerView/marks';
import { tooltips } from '@codemirror/view';

export const cmExtensions = (plugin: IDRPlugin) => {
    const extensions = [];

    extensions.push(
        ...[toggleMarkExtension, tooltips({ parent: document.body })],
    );
    extensions.push(cursorTooltip(plugin));

    return extensions;
};

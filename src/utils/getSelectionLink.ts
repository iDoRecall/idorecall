import { EditorTransaction } from 'obsidian';
import { usePluginState } from '../states/plugin';

const genID = (length = 5) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz-0123456789';
    let id = '';
    while (id.length < length) {
        id += characters[Math.floor(Math.random() * characters.length)];
    }
    return id.slice(0, length);
};

export function getSelectionLink() {
    const editor =
        usePluginState.getState().plugin?.app.workspace.activeEditor?.editor;
    if (!editor) {
        return '';
    }
    const selections = editor.listSelections();
    const transaction: EditorTransaction = {
        changes: [],
    };

    const file = usePluginState
        .getState()
        .plugin?.app.workspace.getActiveFile();
    if (!file) {
        return '';
    }
    let linkId = `^${genID()}`;
    for (const selection of selections) {
        const cursorFrom = selection.anchor;
        const cursorTo = selection.head;
        const minLine = Math.min(cursorFrom.line, cursorTo.line);
        const maxLine = Math.max(cursorFrom.line, cursorTo.line);
        const maxLineLength = editor.getLine(maxLine).length;

        const updatedLines: string[] = [];
        for (let lineNumber = minLine; lineNumber <= maxLine; lineNumber++) {
            let block = editor.getLine(lineNumber);
            const blockIDRegex = /(?:^| +)(?<blockID>\^[a-zA-Z0-9-]+)$/u;

            if (lineNumber === minLine) {
                const blockIDMatch = block.match(blockIDRegex)?.groups?.blockID;
                const blockID =
                    blockIDMatch === undefined ? null : String(blockIDMatch);

                if (blockID === null) {
                    block = block.replace(/\s*?$/, ` ${linkId}`);
                } else {
                    linkId = blockID;
                }
            }
            updatedLines.push(block);
        }

        transaction.changes?.push({
            from: { line: minLine, ch: 0 },
            to: { line: maxLine, ch: maxLineLength },
            text: updatedLines.join('\n'),
        });
        transaction.selections = selections.map((selection) => {
            return { from: selection.anchor, to: selection.head };
        });
        editor.transaction(transaction);
    }
    return linkId;
}

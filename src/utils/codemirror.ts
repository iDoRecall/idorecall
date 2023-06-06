import { syntaxTree } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { SyntaxNodeRef } from '@lezer/common';
import { TransactionRange } from '../cm-extensions/types/types';

export function iterateTreeAtPos(
    pos: number,
    state: EditorState,
    iterateFns: {
        enter(node: SyntaxNodeRef): boolean | void;
        leave?(node: SyntaxNodeRef): void;
    },
) {
    syntaxTree(state).iterate({ ...iterateFns, from: pos, to: pos });
}

export function iterateTreeInSelection(
    selection: TransactionRange,
    state: EditorState,
    iterateFns: {
        enter(node: SyntaxNodeRef): boolean | void;
        leave?(node: SyntaxNodeRef): void;
    },
) {
    syntaxTree(state).iterate({
        ...iterateFns,
        from: selection.from,
        to: selection.to,
    });
}

import { EditorState, StateField } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { oMarks } from 'cm-extensions/markSans/obsidianSyntax';
import { showTooltip, Tooltip } from 'cm-extensions/tooltip';
import IDRPlugin from 'main';
import React from 'react';
import { expandRange, rangeIsMark } from './marks';
import { InlineMenuComponent } from './InlineMenu';
import ReactDOM from 'react-dom';

const cursorTooltipField = (plugin: IDRPlugin) =>
    StateField.define<readonly Tooltip[]>({
        create: getCursorTooltips(plugin),

        update(tooltips, tr) {
            if (!tr.docChanged && !tr.selection) return tooltips;
            return getCursorTooltips(plugin)(tr.state);
        },

        provide: (f) => showTooltip.computeN([f], (state) => state.field(f)),
    });

const getCursorTooltips =
    (plugin: IDRPlugin) =>
    (state: EditorState): readonly Tooltip[] => {
        return state.selection.ranges
            .filter((range) => !range.empty && !!range.to)
            .map((range) => {
                const expandedRange = expandRange(range, state);
                // let line = state.doc.lineAt(range.head);
                const activeMarks = oMarks
                    .map((f) =>
                        rangeIsMark(state, f, expandedRange) ? f.mark : '',
                    )
                    .filter((f) => f !== '');
                return {
                    pos: Math.min(range.head, range.anchor),
                    above: true,
                    strictSide: true,
                    arrow: false,
                    create: (view: EditorView) => {
                        const dom = document.createElement('div');
                        const listener = () => {
                            if (document.getSelection().isCollapsed) {
                                ReactDOM.unmountComponentAtNode(dom);
                                dom.hidden = true;
                                document.removeEventListener(
                                    'selectionchange',
                                    listener,
                                );
                            }
                        };
                        document.addEventListener('selectionchange', listener);
                        dom.className = 'cm-tooltip-cursor';
                        ReactDOM.render(
                            <InlineMenuComponent
                                plugin={plugin}
                                cm={view}
                                activeMarks={activeMarks}
                                mobile={false}
                            />,
                            dom,
                        );
                        return { dom };
                    },
                };
            });
    };

export function cursorTooltip(plugin: IDRPlugin) {
    return cursorTooltipField(plugin);
}

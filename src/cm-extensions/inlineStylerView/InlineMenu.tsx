import { EditorView } from '@codemirror/view';
import { toggleMark } from 'cm-extensions/inlineStylerView/marks';
import IDRPlugin from 'main';
import React from 'react';
import { Mark } from './Mark';
import { InlineStyle, resolveStyles } from './styles';
import './styles/InlineMenu.css';

export const InlineMenuComponent: React.FC<{
    cm?: EditorView;
    activeMarks: string[];
    mobile: boolean;
    plugin: IDRPlugin;
}> = (props) => {
    const toggleMarkAction = (e: React.MouseEvent, s: InlineStyle) => {
        e.preventDefault();
        const cm = props.cm;
        if (!cm) return;
        if (s.mark) {
            cm.dispatch({
                annotations: toggleMark.of(s.mark),
            });
            return;
        }
        const selection = cm.state.selection.main;
        const selectedText = cm.state.sliceDoc(selection.from, selection.to);
        // cm.focus();
        cm.dispatch({
            changes: {
                from: selection.from,
                to: selection.to,
                insert:
                    s.value.substring(0, s.insertOffset) +
                    selectedText +
                    s.value.substring(s.insertOffset),
            },
            selection: s.cursorOffset
                ? {
                    anchor:
                        selection.from +
                        s.value.substring(0, s.insertOffset).length +
                        selectedText.length +
                        s.cursorOffset,
                    head:
                        selection.from +
                        s.value.substring(0, s.insertOffset).length +
                        selectedText.length +
                        s.cursorOffset,
                }
                : {
                    anchor:
                        selection.from + s.value.substring(0, s.insertOffset).length,
                    head:
                        selection.from +
                        s.value.substring(0, s.insertOffset).length +
                        selectedText.length,
                },
        });
    };

    const marksMode = () => (
        <>
            { resolveStyles().map((s, i) => {
                return (
                    <Mark
                        i={ i }
                        style={ s }
                        active={ !!props.activeMarks.find((f) => f == s.mark) }
                        toggleMarkAction={ toggleMarkAction }
                    ></Mark>
                );
            }) }
        </>
    );

    return (
        <div
            className={ 'mk-style-menu menu' }
            onMouseDown={ (e) => e.preventDefault() }
        >
            { marksMode() }
        </div>
    );
};

import { EditorView } from '@codemirror/view';
import IDRPlugin from 'main';
import React from 'react';
import { Mark } from './Mark';
import { InlineStyle, resolveStyles } from './styles';
import './styles/InlineMenu.css';
import { CreateRecallService } from '../../services';

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
        const selection = cm.state.selection.main;
        const selectedText = cm.state.sliceDoc(selection.from, selection.to);

        switch (s.value) {
            case 'toQuestionAndAnswer':
                CreateRecallService.instance.launchCreating({
                    answer: selectedText,
                    question: selectedText,
                });
                break;
            case 'toQuestion':
                CreateRecallService.instance.launchCreating({
                    answer: null,
                    question: selectedText,
                });
                break;
            case 'toAnswer':
                CreateRecallService.instance.launchCreating({
                    answer: selectedText,
                    question: null,
                });
                break;
        }
    };

    const marksMode = () => (
        <>
            {resolveStyles().map((s, i) => {
                return (
                    <Mark
                        i={i}
                        style={s}
                        active={!!props.activeMarks.find((f) => f === s.mark)}
                        toggleMarkAction={toggleMarkAction}
                        key={i}
                    ></Mark>
                );
            })}
        </>
    );

    return (
        <div
            className={'mk-style-menu menu'}
            onMouseDown={(e) => {
                e.preventDefault();
            }}
        >
            {marksMode()}
        </div>
    );
};

import React, { useEffect, useRef, useState } from 'react';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/third_party/embedly.min.js';

import 'froala-editor/css/froala_editor.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import './styles.scss';

import FroalaEditor from 'react-froala-wysiwyg';

import { config } from './config';

export interface AppFroalaEditorProps {
    initContent: string;
    nameField: string;
    isQuestion?: boolean;
    form: any | undefined;
    setError: (arg: string) => void;
}

const ZERO_WIDTH_SPACE_CHAR = 8203;
const NON_BREAKING_SPACE_CHAR = 160;
const SPACE_CHAR = 32;

const AppFroalaEditor: React.FC<AppFroalaEditorProps> = ({
    nameField,
    initContent,
    form,
    setError,
}: AppFroalaEditorProps) => {
    const refFroala = useRef<FroalaEditor>(null);
    const [content, setContent] = useState('');
    const [, setFroalaInnerHTML] = useState('');
    const [froalaInnerText, setFroalaInnerText] = useState('');

    const changeFieldValue = (value: string) => {
        if (!form) return;
        form.setFieldValue(nameField, value);

        form.setFieldValue(
            nameField.substr(0, nameField.indexOf('Markup')),
            froalaInnerText,
        );
    };

    useEffect(() => {
        console.log(initContent);
        if (!initContent) return;
        setContent(initContent);
    }, [initContent]);

    useEffect(() => {
        changeFieldValue(content);
    }, [content]);

    useEffect(() => {
        setFroalaInnerHTML(content);
        if (refFroala.current) {
            setFroalaInnerText((refFroala.current as any).editor.el.innerText);
        }
    }, [content]);

    const handleModelChange = (content: string) => {
        const editor = refFroala.current?.getEditor();
        const contentNodes = editor.el;
        setContent(content);

        const textContent = contentNodes.textContent;

        const isEmptyText =
            textContent.split('').every((item: string) => {
                const char = item.charCodeAt(0);
                return (
                    char === ZERO_WIDTH_SPACE_CHAR ||
                    char === NON_BREAKING_SPACE_CHAR ||
                    char === SPACE_CHAR
                );
            }) || !textContent;

        const isImg = !!contentNodes.querySelector('img');

        if (isEmptyText && !isImg) {
            setError('Required');
        } else if (textContent.length > 1500) {
            setError('Length of symbols must be less than 1500');
        } else {
            setError('');
        }
    };

    return (
        <div>
            <FroalaEditor
                ref={refFroala}
                config={{
                    ...config,
                }}
                tag='textarea'
                model={content}
                onModelChange={handleModelChange}
            />
        </div>
    );
};

export default AppFroalaEditor;

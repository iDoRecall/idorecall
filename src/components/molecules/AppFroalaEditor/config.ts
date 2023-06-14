import { environment } from '../../../environments/environment';

export const froalaPlugins = [
    'syntaxHighlighter',
    'align',
    'charCounter',
    'codeBeautifier',
    'codeView',
    'colors',
    'draggable',
    'embedly',
    'emoticons',
    'specialCharacters',
    'entities',
    'fontAwesome',
    'fontFamily',
    'fontSize',
    'image',
    'imageTUI',
    'imageManager',
    'inlineStyle',
    'inlineClass',
    'lineBreaker',
    'lineHeight',
    'link',
    'lists',
    'paragraphFormat',
    'paragraphStyle',
    'quickInsert',
    'quote',
    'save',
    'table',
    'url',
    'wordPaste',
];

let memoContent = '';

export const config = {
    placeholderText: '',
    charCounterCount: false,
    key: environment.froalaLicenseKey,
    attribution: false,
    enter: 2,
    editorClass: 'mq-math-mode',
    htmlAllowedEmptyTags: ['span', 'table'],
    keepFormatOnDelete: true,
    restrictedSymbolsLength: 1500,
    pluginsEnabled: froalaPlugins,
    events: {
        'paste.afterCleanup': () => memoContent,
        'paste.before': (event: ClipboardEvent): void => {
            if (!event?.clipboardData) {
                memoContent = '';
                return;
            }

            const contentData = event.clipboardData.getData('text/plain');

            const template = document.createElement('template');
            template.innerHTML = contentData;

            if (template.content.firstChild?.nodeName === 'IFRAME') {
                memoContent = '';
                return;
            }

            memoContent = contentData.replace(/(?:\r\n|\r|\n)/g, '<br>');
        },
        initialized: function (): void {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const editor: any = this;
            editor.events.on(
                'drop',
                function (e: any) {
                    console.log(e);
                    return false;
                },
                true,
            );
        },
        'image.beforeUpload': async function (files: File[]): Promise<boolean> {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const editor: any = this;
            console.log(window);
            if (files.length) {
                const reader = new FileReader();
                const promise = new Promise((resolve) => {
                    reader.onload = (e: ProgressEvent<FileReader>) => {
                        e.target ? resolve(e.target.result) : resolve(null);
                    };
                });
                reader.readAsDataURL(files[0]);
                const image = await promise;
                if (!image) {
                    return false;
                }
                editor.image.insert(image, null, null, editor.image.get());
            }
            editor.popups.hideAll();
            return false;
        },
    },
    toolbarButtons: {
        moreText: {
            buttons: [
                'bold',
                'italic',
                'underline',
                'strikeThrough',
                'subscript',
                'superscript',
                'fontFamily',
                'fontSize',
                'inlineClass',
                'inlineStyle',
                'clearFormatting',
            ],
            buttonsVisible: 2,
        },
        moreParagraph: {
            buttons: [
                'alignLeft',
                'alignCenter',
                'alignRight',
                'formatOL',
                'formatUL',
                'paragraphFormat',
                'paragraphStyle',
                'lineHeight',
                'outdent',
                'indent',
            ],
            align: 'left',
            buttonsVisible: 2,
        },
        moreRich: {
            buttons: ['highlightCode', 'fontAwesome', 'specialCharacters'],
            align: 'left',
            buttonsVisible: 3,
        },
    },
};

// import { cmExtensions } from 'cm-extensions/cmExtensions';
import {
    addIcon,
    App,
    EditorTransaction,
    Menu,
    MenuItem,
    Modal,
    Notice,
    Plugin,
    PluginSettingTab,
    Setting,
    ViewState,
    WorkspaceLeaf,
} from 'obsidian';
import IDRView from './view';
import { setDarkTheme } from './utils/setDarkTheme';
import { statesFacade } from './states/statesFacade';
import { CreateRecallService, UnmountService } from './services';

interface IDRPluginSettings {
    apiKey: string;
    isDarkTheme: boolean;
}

interface Recall {
    question: string;
    answer: string;
    source?: {
        type: string;
        link: string;
    };
    tags?: string;
    reversible: boolean;
}

export default class IDRPlugin extends Plugin {
    settings: IDRPluginSettings;
    queue: Promise<void>;
    statusBarEl: HTMLElement;
    private view: IDRView;

    async onload() {
        await this.loadSettings();

        this.statusBarEl = this.addStatusBarItem();

        addIcon(
            'idr-icon',
            '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 76.1 54.44"><defs><style>.cls-1{fill:url(#linear-gradient);}.cls-2{fill:url(#linear-gradient-2);}.cls-3{fill:url(#linear-gradient-3);}.cls-4{fill:#c81d1e;}.cls-5{fill:#e6af3d;}.cls-6{fill:#a8c9b3;}</style><linearGradient id="linear-gradient" x1="6.84" y1="39.2" x2="6.84" y2="2.24" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#cdcccc"/><stop offset="1" stop-color="#fff"/></linearGradient><linearGradient id="linear-gradient-2" x1="29.78" y1="39.2" x2="29.78" y2="2.5" xlink:href="#linear-gradient"/><linearGradient id="linear-gradient-3" x1="60.81" y1="39.2" x2="60.81" y2="2.5" xlink:href="#linear-gradient"/></defs><title>Artboard 13 copy 2</title><path class="cls-1" d="M2.69,2.22H11v6H2.69Zm0,9.24H11v27.8H2.69Z"/><path class="cls-2" d="M15.51,2.48H29.12C38.37,2.48,44,7,44,15V26.71c0,8.14-5.67,12.55-14.92,12.55H15.51Zm13.61,28.9c4.1,0,5.88-2.42,5.88-4.46V14.83c0-2.1-1.78-4.47-5.88-4.47H24.55v21Z"/><path class="cls-3" d="M48,2.48H62.86c6.3,0,9.93,4.1,9.93,10.67,0,6-3.1,9.61-8.14,10.4l9,15.08v.63H72.05L62.81,23.81H49.67V39.26H48Zm14.4,19.75c5.36,0,8.67-3.3,8.67-9.08S68,4.06,62.65,4.06h-13V22.23Z"/><rect class="cls-4" x="2.67" y="47.74" width="8.29" height="4.48"/><rect class="cls-5" x="15.44" y="47.6" width="9.13" height="4.48"/><rect class="cls-6" x="28.61" y="47.6" width="45.08" height="4.48"/></svg>',
        );

        this.addRibbonIcon('idr-icon', 'IDoRecall Plugin', () => {
            // TODO: maybe trigger react view by press idr-icon
            this.handleIDRModal();
        });

        this.registerView(
            'idr-view',
            (leaf: WorkspaceLeaf) => (this.view = new IDRView(leaf, this)),
        );

        this.addCommand({
            id: 'create-recall',
            name: 'Create recall',
            callback: () => {
                this.handleIDRModal();
            },
        });

        this.addSettingTab(new IDRSettingTab(this.app, this));

        this.registerObsidianProtocolHandler('idr-uri', async (e) => {
            const filePath = e.file + '#' + e.block;

            const state: ViewState = {
                type: 'markdown',
                state: {
                    backlinks: undefined,
                    file: e.file,
                    mode: 'source',
                    source: false,
                },
            };

            return void this.app.workspace.openLinkText(
                filePath,
                e.vault,
                false,
                state,
            );
        });

        this.registerEvent(
            this.app.workspace.on('editor-menu', (menu: Menu) => {
                menu.addItem((item: MenuItem) => {
                    item.setTitle('Create recall')
                        .setIcon('idr-icon')
                        .onClick(() => {
                            this.handleIDRModal();
                        });
                });
            }),
        );

        this.registerEvent(
            this.app.workspace.on('file-open', async (file) => {
                // Close and open view on file-open trigger
                // TODO: Check another way to change recallsList
                await this.activateView();
            }),
        );

        statesFacade.setPlugin(this);
        void statesFacade.loadUser();

        // this.registerEditorExtension(cmExtensions(this));
        await this.activateView();
    }

    async activateView() {
        this.app.workspace.detachLeavesOfType('idr-view');

        await this.app.workspace.getRightLeaf(false).setViewState({
            type: 'idr-view',
            active: true,
        });

        this.app.workspace.revealLeaf(
            this.app.workspace.getLeavesOfType('idr-view')[0],
        );
    }

    async loadSettings() {
        this.settings = Object.assign({}, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    private handleIDRModal() {
        if (!app?.workspace?.activeEditor?.editor?.getSelection()) {
            new Notice(`Select text to proceed`);
            return;
        }
        // TODO: create apiKey guard
        if (!this.settings.apiKey) {
            new Notice(`Please provide IDR api key`);
            return;
        }

        const answer = app.workspace.activeEditor?.editor?.getSelection();
        if (typeof answer === 'string') {
            CreateRecallService.instance.launchCreating(answer);
        }
    }

    onunload() {
        this.app.workspace.detachLeavesOfType('idr-view');
        UnmountService.instance.unmount();
    }
}

export class IDRModal extends Modal {
    result: Recall = {
        question: '',
        answer: '',
        reversible: false,
    };

    onSubmit: (result: Recall) => void;

    constructor(app: App, onSubmit: (result: Recall) => void) {
        super(app);
        this.onSubmit = onSubmit;
    }

    onOpen() {
        const { contentEl } = this;

        contentEl.createEl('h1', { text: 'Create recall' });

        new Setting(contentEl).setName('Question').addTextArea((text) =>
            text.onChange((value) => {
                this.result.question = value;
            }),
        );

        new Setting(contentEl).setName('Answer').addTextArea((text) => {
            const answer = app.workspace.activeEditor?.editor?.getSelection();
            if (typeof answer === 'string') {
                text.setValue(answer);
                this.result.answer = answer;
            }
            text.onChange((value) => {
                this.result.answer = value;
            });
        });

        new Setting(contentEl)
            .setName('Tags')
            .setDesc('Example: tag1,tag2,tag3')
            .addText((text) => {
                text.onChange((value) => {
                    this.result.tags = value;
                });
            });

        new Setting(contentEl)
            .setName('Reversible')
            .setDesc('Set recall as reversible')
            .addToggle((t) => {
                t.onChange((value) => {
                    this.result.reversible = value;
                });
            });

        new Setting(contentEl).addButton((btn) =>
            btn
                .setButtonText('Submit')
                .setCta()
                .onClick(() => {
                    if (!this.result.question.length) {
                        new Notice('Question field is empty');
                    } else if (!this.result.answer.length) {
                        new Notice('Answer field is empty');
                    } else {
                        const link = getLink();
                        this.result.source = {
                            type: 'simple_source',
                            link: `obsidian://idr-uri?vault=${this.app.vault.getName()}&file=${
                                this.app.workspace.getActiveFile()?.basename
                            }&block=${link}`,
                        };
                        this.close();
                        this.onSubmit(this.result);
                    }
                }),
        );
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

function getLink() {
    const editor = app.workspace.activeEditor?.editor;
    if (!editor) {
        return '';
    }
    const selections = editor.listSelections();
    const transaction: EditorTransaction = {
        changes: [],
    };

    const file = app.workspace.getActiveFile();
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

const genID = (length = 5) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz-0123456789';
    let id = '';
    while (id.length < length) {
        id += characters[Math.floor(Math.random() * characters.length)];
    }
    return id.slice(0, length);
};

class IDRSettingTab extends PluginSettingTab {
    plugin: IDRPlugin;

    constructor(app: App, plugin: IDRPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        containerEl.createEl('h2', { text: 'Settings for IDR plugin.' });

        new Setting(containerEl)
            .setName('IDR api key')
            .setDesc('Use IDR api key for obsidian on profile page')
            .addText((text) =>
                text
                    .setPlaceholder('Enter your IDR api key')
                    .setValue(this.plugin.settings.apiKey)
                    .onChange(async (value) => {
                        this.plugin.settings.apiKey = value;
                        await this.plugin.saveSettings();
                    }),
            );
        new Setting(containerEl)
            .setName('IDR dark theme')
            .setDesc('Use dark theme if you prefer')
            .addToggle((toggle) =>
                toggle
                    .setValue(this.plugin.settings.isDarkTheme)
                    .onChange(async (checked) => {
                        this.plugin.settings.isDarkTheme = checked;
                        setDarkTheme(checked);
                        await this.plugin.saveSettings();
                    }),
            );
    }
}

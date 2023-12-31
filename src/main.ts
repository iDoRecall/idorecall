import { cmExtensions } from 'cm-extensions/cmExtensions';
import {
    addIcon,
    Editor,
    Plugin,
    TAbstractFile,
    ViewState,
    WorkspaceLeaf,
} from 'obsidian';
import IDRView from './view';
import {
    ActiveEditorService,
    NoticeService,
    PluginService,
    RecallFromState,
    RecallListService,
    RouterPathService,
    ViewOpenService,
} from './services';
import { IDRPluginSettings } from './models';
import { COMMAND_LIST } from './constants/command-list';
import { CommandService } from './services/command';
import { IDRSettingTab } from './utils/settings';

const VIEW_TYPE = 'idr-view';

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

        this.addRibbonIcon('idr-icon', 'iDoRecall', () => {
            void this.activateView();
        });

        this.registerView(
            VIEW_TYPE,
            (leaf: WorkspaceLeaf) => (this.view = new IDRView(leaf, this)),
        );

        this.addSettingTab(new IDRSettingTab(this.app, this));

        this.registerObsidianProtocolHandler('idr-uri', async (e) => {
            const file = this.app.vault.getFiles().find((file) => {
                return file.path === String(e.file);
            });
            const filePath = file?.path + '#' + e.block;
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
            this.app.workspace.on('file-open', async (file) => {
                const isRoot = window.location.pathname === '/';

                if (!file) {
                    if (!isRoot) {
                        RecallFromState.instance.setFormClosed();
                    }

                    RecallListService.instance.setRecallList([]);

                    return;
                }

                if (
                    file?.basename &&
                    ViewOpenService.instance.isOpened &&
                    !isRoot
                ) {
                    const formState = RecallFromState.instance.formState;

                    if (formState) {
                        RecallFromState.instance.setFormClosed();
                    }

                    RouterPathService.instance.moveToRoot();
                    await this.activateView();
                }

                if (
                    file?.basename &&
                    ViewOpenService.instance.isOpened &&
                    isRoot
                ) {
                    RecallListService.instance.loadRecallList(file.path);
                }

                const editor = this.app.workspace.activeEditor?.editor;

                if (editor) {
                    ActiveEditorService.instance.setActiveEditor(editor);
                }
            }),
        );

        this.registerEvent(
            this.app.vault.on('rename', (file: TAbstractFile) => {
                NoticeService.instance.notice(
                    'After changing the title, iDoRecall was reload',
                );
                RecallListService.instance.loadRecallList(file.path);
            }),
        );

        for (const { id, name, hotkeys } of COMMAND_LIST) {
            this.addCommand({
                id,
                name,
                hotkeys,
                editorCallback: (editor: Editor) => {
                    const selection = editor.getSelection();
                    CommandService.instance.createRecall(id, selection);
                },
            });
        }

        PluginService.instance.setPlugin(this);

        this.registerEditorExtension(cmExtensions(this));
    }

    async activateView(): Promise<void> {
        const leavesOfType = this.app.workspace.getLeavesOfType(VIEW_TYPE);

        if (leavesOfType.length > 0) {
            this.app.workspace.revealLeaf(leavesOfType[0]);

            return;
        }

        await this.app.workspace
            .getRightLeaf(false)
            .setViewState({ type: VIEW_TYPE, active: true });
    }

    async loadSettings() {
        this.settings = Object.assign({}, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    onunload() {
        RouterPathService.instance.moveToRoot();
    }
}

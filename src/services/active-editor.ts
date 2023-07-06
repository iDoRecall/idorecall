import { Editor } from 'obsidian';
import { usePluginState } from '../states/plugin';

export class ActiveEditorService {
    private static _instance: ActiveEditorService;

    public setActiveEditor(editor: Editor): void {
        usePluginState.getState().setActiveEditor(editor);
    }

    public static get instance(): ActiveEditorService {
        if (!ActiveEditorService._instance) {
            ActiveEditorService._instance = new ActiveEditorService();
        }
        return ActiveEditorService._instance;
    }
}

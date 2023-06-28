import { createBrowserHistory } from '@remix-run/router';
import { usePluginState } from '../states/plugin';
import { useLaunchCreatingState } from '../states/launch-creating';
import { Recall } from '../models';
import { RecallService } from '../api/recall';
import { getSelectionLink, removeSelectionLink } from '../utils/selectionLink';

export class CreateRecallService {
    private static _instance: CreateRecallService;

    public launchCreating(answer: string): void {
        const history = createBrowserHistory();
        const { plugin } = usePluginState.getState();
        const { setAnswer, setLinkId, setActiveEditor } =
            useLaunchCreatingState.getState();

        if (plugin?.app.workspace.activeEditor?.editor) {
            setActiveEditor(plugin.app.workspace.activeEditor.editor);
        }
        setAnswer(answer);
        setLinkId(getSelectionLink());
        history.push('/create');
        void plugin?.activateView();
    }

    public async create(recall: Recall): Promise<boolean> {
        const { linkId, activeEditor } = useLaunchCreatingState.getState();
        const payload = {
            ...recall,
            source: {
                type: 'simple_source',
                link: `obsidian://idr-uri?vault=${usePluginState
                    .getState()
                    .plugin?.app.vault.getName()}&file=${
                    usePluginState
                        .getState()
                        .plugin?.app.workspace.getActiveFile()?.basename
                }&block=${linkId}`,
            },
            groupIds: recall.shareClasses?.map((group) => group.id),
        };

        return await RecallService.instance.createRecall(payload).catch((e) => {
            if (linkId && activeEditor) {
                removeSelectionLink(linkId, activeEditor);
            }
            return false;
        });
    }

    public unLaunchCreating(): void {
        const { linkId, activeEditor } = useLaunchCreatingState.getState();
        if (linkId && activeEditor) {
            removeSelectionLink(linkId, activeEditor);
        }
    }

    public resetCreatingData(): void {
        const { reset } = useLaunchCreatingState.getState();
        reset();
    }

    public static get instance(): CreateRecallService {
        if (!CreateRecallService._instance) {
            CreateRecallService._instance = new CreateRecallService();
        }
        return CreateRecallService._instance;
    }
}

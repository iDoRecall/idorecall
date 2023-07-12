import { createBrowserHistory } from '@remix-run/router';
import { usePluginState } from '../states/plugin';
import { useLaunchCreatingState } from '../states/launch-creating';
import { Recall } from '../models';
import { RecallService } from '../api/recall';
import { getSelectionLink, removeSelectionLink } from '../utils/selectionLink';

export class CreateRecallService {
    private static _instance: CreateRecallService;

    public launchCreating(fields: {
        answer: string | null;
        question: string | null;
    }): void {
        const history = createBrowserHistory();
        const { plugin } = usePluginState.getState();
        const { setFields, setLinkId } = useLaunchCreatingState.getState();
        setFields(fields);
        setLinkId(getSelectionLink());
        history.push('/create');
        void plugin?.activateView();
    }

    public async create(recall: Recall): Promise<boolean> {
        const { linkId } = useLaunchCreatingState.getState();
        const { activeEditor } = usePluginState.getState();
        const payload = {
            ...recall,
            source: {
                type: 'simple_source',
                link: encodeURI(
                    `obsidian://idr-uri?vault=${usePluginState
                        .getState()
                        .plugin?.app.vault.getName()}&file=${
                        usePluginState
                            .getState()
                            .plugin?.app.workspace.getActiveFile()?.basename
                    }&block=${linkId}`,
                ),
            },
            groupIds: recall.shareClasses?.map((group) => group.id),
        };

        return await RecallService.instance.createRecall(payload).catch(() => {
            if (linkId && activeEditor) {
                removeSelectionLink(linkId, activeEditor);
            }
            return false;
        });
    }

    public unLaunchCreating(): void {
        const { linkId } = useLaunchCreatingState.getState();
        const { activeEditor } = usePluginState.getState();
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

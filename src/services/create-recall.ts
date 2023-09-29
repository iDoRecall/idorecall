import { createBrowserHistory } from '@remix-run/router';
import { usePluginState } from '../states/plugin';
import { useLaunchCreatingState } from '../states/launch-creating';
import { Recall } from '../models';
import { RecallService } from '../api/recall';
import { getSelectionLink, removeSelectionLink } from '../utils/selectionLink';
import { RewriteFormService } from './rewrite-form';
import { isLinkIdUsed } from '../utils/is-link-id-used';

export class CreateRecallService {
    private static _instance: CreateRecallService;

    public launchCreating(fields: {
        answer: string | null;
        question: string | null;
    }): void {
        const history = createBrowserHistory();
        const { plugin } = usePluginState.getState();
        const { setFields, setLinkId } = useLaunchCreatingState.getState();
        const { linkId } = useLaunchCreatingState.getState();
        const newLinkId = getSelectionLink();
        setLinkId(newLinkId);

        const linkIdIsUsed = isLinkIdUsed(linkId);

        if (linkId) {
            if (linkId !== newLinkId && !linkIdIsUsed) {
                this.unLaunchCreating(linkId);
            }
            RewriteFormService.instance.isRewrite = true;
        } else {
            RewriteFormService.instance.isRewrite = false;
        }

        setFields(fields);
        history.push('/create');
        plugin.app.workspace.detachLeavesOfType('idr-view');
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
                            .plugin?.app.workspace.getActiveFile()?.path
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

    public unLaunchCreating(linkId: string): void {
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

import { Recall } from '../models';
import { usePluginState } from '../states/plugin';
import { RecallService } from '../api/recall';
import { NoticeService } from './notice';
import { removeSelectionLink } from '../utils/selectionLink';
import { useRecallListState } from '../states/recall-list';
import { isLinkIdUsed } from '../utils/is-link-id-used';

export class DeleteRecallService {
    private static _instance: DeleteRecallService;

    public static get instance(): DeleteRecallService {
        if (!DeleteRecallService._instance) {
            DeleteRecallService._instance = new DeleteRecallService();
        }
        return DeleteRecallService._instance;
    }

    public async deleteRecall(recall: Recall): Promise<void> {
        const sourceParams = new URLSearchParams(recall.source.link);
        const block = sourceParams.get('block');
        const plugin = usePluginState.getState()?.plugin;
        const activeEditor = usePluginState.getState()?.activeEditor;

        const isDeleted = await RecallService.instance
            .deleteRecall(recall)
            .catch(() => false);

        if (!(isDeleted && block && activeEditor)) {
            // once bug with link removing was seen, and still not resolved
            console.warn('FOR FUTURE BUG SEE INFO:');
            console.table({
                isDeleted,
                block,
                activeEditor,
            });
        }

        if (isDeleted) {
            NoticeService.instance.notice('Recall deleted successfully');
            const ctime = plugin?.app.workspace.getActiveFile()?.stat.ctime;
            if (ctime) {
                void useRecallListState
                    .getState()
                    .loadRecallList(ctime)
                    .then(() => {
                        if (block && activeEditor && !isLinkIdUsed(block)) {
                            removeSelectionLink(block, activeEditor);
                        }
                    });
            }
        } else {
            NoticeService.instance.notice(
                'Recall isn`t deleted, something wrong',
            );
        }
    }
}

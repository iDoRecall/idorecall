import { Recall } from '../models';
import { usePluginState } from '../states/plugin';
import { RecallService } from '../api/recall';
import { NoticeService } from './notice';
import { removeSelectionLink } from '../utils/selectionLink';
import { useRecallListState } from '../states/recall-list';

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

        if (isDeleted) {
            NoticeService.instance.notice('Recall deleted successfully');
            if (block && activeEditor) {
                removeSelectionLink(block, activeEditor);
            }
            const basename = plugin?.app.workspace.getActiveFile()?.basename;
            if (basename) {
                void useRecallListState.getState().loadRecallList(basename);
            }
        } else {
            NoticeService.instance.notice(
                'Recall is`nt deleted, something wrong',
            );
        }
    }
}

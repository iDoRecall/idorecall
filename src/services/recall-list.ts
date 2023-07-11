import { useRecallListState } from '../states/recall-list';

export class RecallListService {
    private static _instance: RecallListService;

    public loadRecallList(basename: string): void {
        void useRecallListState.getState().loadRecallList(basename);
    }

    public static get instance(): RecallListService {
        if (!RecallListService._instance) {
            RecallListService._instance = new RecallListService();
        }
        return RecallListService._instance;
    }
}

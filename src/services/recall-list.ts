import { useRecallListState } from '../states/recall-list';

export class RecallListService {
    private static _instance: RecallListService;

    public loadRecallList(ctime: number): void {
        void useRecallListState.getState().loadRecallList(ctime);
    }

    public static get instance(): RecallListService {
        if (!RecallListService._instance) {
            RecallListService._instance = new RecallListService();
        }
        return RecallListService._instance;
    }
}

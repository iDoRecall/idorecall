import { useRecallListState } from '../states/recall-list';
import { Recall } from '../models';

export class RecallListService {
    private static _instance: RecallListService;

    public loadRecallList(path: string): void {
        if (path) {
            void useRecallListState.getState().loadRecallList(path);
        }
    }

    public get recallList(): Recall[] {
        return useRecallListState.getState().recallList;
    }

    public setRecallList(recallList: Recall[]): void {
        useRecallListState.getState().setRecallList(recallList);
    }

    public static get instance(): RecallListService {
        if (!RecallListService._instance) {
            RecallListService._instance = new RecallListService();
        }
        return RecallListService._instance;
    }
}

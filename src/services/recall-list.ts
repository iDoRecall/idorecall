import { useRecallListState } from '../states/recall-list';
import { Recall } from '../models';
import { useUserState } from '../states/user';

export class RecallListService {
    private static _instance: RecallListService;

    public loadRecallList(ctime: number): void {
        const { user } = useUserState();

        if (user && ctime) {
            void useRecallListState.getState().loadRecallList(ctime);
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

import { RestService } from '../restService';
import { Recall } from '../../models';

export class RecallListService {
    private static _instance: RecallListService;
    private readonly rest = RestService.instance;

    public static get instance(): RecallListService {
        if (!RecallListService._instance) {
            RecallListService._instance = new RecallListService();
        }
        return RecallListService._instance;
    }

    public async getRecalls(path: string): Promise<Recall[]> {
        const encodedPath = encodeURIComponent(path);

        return this.rest.requestWrapper<Recall[]>(
            `obsidian/recalls?file=${encodedPath}`,
            'GET',
        );
    }
}

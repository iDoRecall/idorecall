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

    public async getRecalls(basename: string): Promise<Recall[]> {
        return await this.rest.get<Recall[]>('obsidian/recalls', {
            params: { file: encodeURI(basename) },
        });
    }
}

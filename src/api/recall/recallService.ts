import { RestService } from '../restService';
import { Recall } from '../../models';

export class RecallService {
    private static _instance: RecallService;
    private readonly rest = RestService.instance;

    public static get instance(): RecallService {
        if (!RecallService._instance) {
            RecallService._instance = new RecallService();
        }
        return RecallService._instance;
    }

    public async createRecall(recall: Recall): Promise<boolean> {
        return this.rest.requestWrapper<boolean>(
            'obsidian/recalls',
            'POST',
            recall,
        );
    }

    public async editRecall(recall: Recall): Promise<Recall> {
        return this.rest.requestWrapper<Recall>(
            `obsidian/recalls/${recall.id}`,
            'PATCH',
            recall,
        );
    }

    public async deleteRecall(recall: Recall): Promise<boolean> {
        return this.rest.requestWrapper<boolean>(
            `obsidian/recalls/${recall.id}`,
            'DELETE',
        );
    }

    public async getRecallById(id: string): Promise<Recall> {
        return this.rest.requestWrapper<Recall>(
            `obsidian/recalls/${id}`,
            'GET',
        );
    }
}

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
        return await this.rest.post<boolean>('obsidian/recalls', recall);
    }

    public async editRecall(recall: Recall): Promise<Recall> {
        return await this.rest.patch<Recall>(
            `obsidian/recalls/${recall.id}`,
            recall,
        );
    }

    public async deleteRecall(recall: Recall): Promise<boolean> {
        return await this.rest.delete<boolean>(`obsidian/recalls/${recall.id}`);
    }

    public async getRecallById(id: string): Promise<Recall> {
        return await this.rest.get<Recall>(`obsidian/recalls/${id}`);
    }
}

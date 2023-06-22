import { createBrowserHistory } from '@remix-run/router';
import { usePluginState } from '../states/plugin';
import { useCreateRecallState } from '../states/create-recall';

export class CreateRecallService {
    private static _instance: CreateRecallService;

    public create(answer: string): void {
        const history = createBrowserHistory();
        const { plugin } = usePluginState.getState();
        const { setAnswer } = useCreateRecallState.getState();

        setAnswer(answer);
        history.push('/edit');
        void plugin?.activateView();
    }

    public static get instance(): CreateRecallService {
        if (!CreateRecallService._instance) {
            CreateRecallService._instance = new CreateRecallService();
        }
        return CreateRecallService._instance;
    }
}

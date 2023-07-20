import { createBrowserHistory } from '@remix-run/router';

export class RouterPathService {
    private static _instance: RouterPathService;

    public moveToRoot(): void {
        const history = createBrowserHistory();

        history.push('/');
    }

    public static get instance(): RouterPathService {
        if (!RouterPathService._instance) {
            RouterPathService._instance = new RouterPathService();
        }
        return RouterPathService._instance;
    }
}

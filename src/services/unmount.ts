import { createBrowserHistory } from '@remix-run/router';

export class UnmountService {
    private static _instance: UnmountService;

    public unmount(): void {
        const history = createBrowserHistory();

        history.push('/');
    }

    public static get instance(): UnmountService {
        if (!UnmountService._instance) {
            UnmountService._instance = new UnmountService();
        }
        return UnmountService._instance;
    }
}

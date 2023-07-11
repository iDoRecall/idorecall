import { useViewOpenState } from '../states/view-open-state';

export class ViewOpenService {
    private static _instance: ViewOpenService;

    public get isOpened(): boolean {
        return useViewOpenState.getState().isOpened;
    }

    public static get instance(): ViewOpenService {
        if (!ViewOpenService._instance) {
            ViewOpenService._instance = new ViewOpenService();
        }
        return ViewOpenService._instance;
    }
}

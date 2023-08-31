export class RewriteFormService {
    private static _instance: RewriteFormService;
    private rewriteStatus = false;

    public get isRewrite(): boolean {
        return this.rewriteStatus;
    }

    public set isRewrite(isRewrite: boolean) {
        this.rewriteStatus = isRewrite;
    }

    public static get instance(): RewriteFormService {
        if (!RewriteFormService._instance) {
            RewriteFormService._instance = new RewriteFormService();
        }
        return RewriteFormService._instance;
    }
}

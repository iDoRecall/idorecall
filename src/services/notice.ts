import { Notice } from 'obsidian';

export class NoticeService {
    private static _instance: NoticeService;

    public notice(text: string | DocumentFragment, duration = 5000): void {
        new Notice(text, duration);
    }

    public static get instance(): NoticeService {
        if (!NoticeService._instance) {
            NoticeService._instance = new NoticeService();
        }

        return NoticeService._instance;
    }
}

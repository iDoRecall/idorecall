import { NoticeService } from './notice';
import { COMMAND_ID } from '../constants/command-list';
import { CreateRecallService } from './create-recall';

export class CommandService {
    private static _instance: CommandService;

    public static get instance(): CommandService {
        if (!CommandService._instance) {
            CommandService._instance = new CommandService();
        }

        return CommandService._instance;
    }

    public createRecall(commandId: string, selection: string): void {
        if (!selection) {
            NoticeService.instance.notice('Please, select the text');
            return;
        }

        switch (commandId) {
            case COMMAND_ID.CREATE_RECALL_ANSWER:
                CreateRecallService.instance.launchCreating({
                    answer: selection,
                    question: null,
                });
                break;

            case COMMAND_ID.CREATE_RECALL_QUESTION:
                CreateRecallService.instance.launchCreating({
                    answer: null,
                    question: selection,
                });
                break;

            case COMMAND_ID.CREATE_RECALL_QUESTION_AND_ANSWER:
                CreateRecallService.instance.launchCreating({
                    answer: selection,
                    question: selection,
                });
                break;
        }
    }
}

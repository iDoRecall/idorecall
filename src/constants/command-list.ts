import { Command } from 'obsidian';

export enum COMMAND_ID {
    OPEN_PLUGIN = 'open-plugin',
    CREATE_RECALL_ANSWER = 'create-recall-answer',
    CREATE_RECALL_QUESTION = 'create-recall-question',
    CREATE_RECALL_QUESTION_AND_ANSWER = 'create-recall-question-and-answer',
}

export const COMMAND_LIST: Command[] = [
    {
        id: COMMAND_ID.OPEN_PLUGIN,
        name: 'Open plugin',
    },
    {
        id: COMMAND_ID.CREATE_RECALL_ANSWER,
        name: 'Create recall, send selected text to the A',
    },
    {
        id: COMMAND_ID.CREATE_RECALL_QUESTION,
        name: 'Create recall, send selected text to the Q',
    },
    {
        id: COMMAND_ID.CREATE_RECALL_QUESTION_AND_ANSWER,
        name: 'Create recall, send selected text to both the Q and A',
    },
];

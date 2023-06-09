export interface User {
    avatarUrl: string;
    email: string;
    firstName: string;
    id: string;
    unprocessedLibraryItems?: number;
    timezone: number;
    createdAt: Date;
    updatedAt: Date;
    lastName: string;
    isPushSubscribe: boolean;
    pushRemindersDays: number[];
    isEmailSubscribe: boolean;
    emailRemindersDays: number[];
    weekendsRemindersTime: string;
    weekdaysRemindersTime: string;
    cloneBySomeone: boolean;
    actionForAdmin: boolean;
    inviteId: string;
    recallsQuestionAutoplayState: number;
    recallsAnswerAutoplayState: number;
}

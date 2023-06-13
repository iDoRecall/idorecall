import { Recall } from '../../../models';

export interface RecallCardProps {
    activeCard?: boolean;
    recall: Recall;
    changeActiveCard: (id: string, shouldBecomeActive: boolean) => void;
    deleteRecall: (recall: Recall) => void;
}

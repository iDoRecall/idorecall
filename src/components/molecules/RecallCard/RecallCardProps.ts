import { Recall } from '../../../models';

export interface RecallCardProps {
    activeCard?: boolean;
    recall: Recall;
    changeActiveCard: (
        id: string,
        shouldDoScrollDoc: boolean,
        shouldBecomeActive: boolean,
        shouldDoScrollExt: boolean,
    ) => void;
    deleteRecall: (recall: Recall) => void;
}

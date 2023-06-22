import { Recall } from '../../../models';

export interface RecallFormProps {
    recall?: Recall | null;
    backRoute?: string;
    partialRecall?: Partial<Recall> | null;
}

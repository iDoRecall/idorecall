import { AutocompleteItem, Recall } from '../../../models';

export interface RecallFormProps {
    recall?: Recall | null;
    backRoute?: string;
    partialRecall?: Partial<Recall> | null;
    onTagInput: (inputValue: string) => void;
    onClassesInput: (inputValue: string) => void;
    onSubmit: (recall: Recall) => void;
    tagSearch: AutocompleteItem[];
    classesSearch: AutocompleteItem[];
}

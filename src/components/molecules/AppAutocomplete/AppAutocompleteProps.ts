import { AutocompleteItem } from '../../../models';

export interface AppAutocompleteProps {
    initContent: AutocompleteItem[];
    placeholder?: string;
    nameField: string;
    form?: any;
    isAction?: boolean;
    onInput: (inputValue: string) => void;
    itemsSearch: AutocompleteItem[];
}

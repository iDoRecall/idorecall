import defaultStyles from './default';

export interface InlineStyle {
    label: string;
    value: string;
    icon: string;
    mark?: string;
}

export function resolveStyles() {
    return defaultStyles;
}

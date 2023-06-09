import { ShareClasses } from './share-classes.interface';
import { Tags } from './tags.interface';
import { SimpleSource } from './simple-source.inteface';

export interface Recall {
    id: string;
    answer: string;
    question: string;
    questionMarkup: string;
    answerMarkup: string;
    reversible: boolean;
    tags: Tags[];
    source: SimpleSource;
    shareClasses?: ShareClasses[];
    groupIds?: string[];
    tag?: string;
    sourceLink?: string;
}

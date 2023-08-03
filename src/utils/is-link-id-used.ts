import { RecallListService } from '../services';

export function isLinkIdUsed(linkId: string): boolean {
    const currentRecallList = RecallListService.instance.recallList;
    return currentRecallList
        .map((recall) => new URLSearchParams(recall.source.link).get('block'))
        .includes(linkId);
}

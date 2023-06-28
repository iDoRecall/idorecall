export function removeLink(content: string, linkId: string): string {
    const escapedLinkId = escapeRegExp(linkId);
    const spaceRegex = new RegExp(` ${escapedLinkId}`, 'g');
    const spareRegex = new RegExp(escapedLinkId, 'g');
    const result = content.replace(spaceRegex, '');
    return result.replace(spareRegex, '');
}

function escapeRegExp(string: string): string {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

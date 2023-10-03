export const getFragment = (innerContent: string): DocumentFragment => {
    const fragment = document.createDocumentFragment();
    const parser = new DOMParser();
    const parsedContent = parser.parseFromString(innerContent, 'text/html');

    while (parsedContent.body.firstChild) {
        fragment.appendChild(parsedContent.body.firstChild);
    }

    return fragment;
};

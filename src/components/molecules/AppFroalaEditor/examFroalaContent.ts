const P_NODE_NAME = 'P';
const IMG_NODE_NAME = 'IMG';
const TEXT_NODE_NAME = '#text';
const BR_NODE_NAME = 'BR';

type DomElement = HTMLElement | ChildNode;

const insertAfter = (
    inserableNode: DomElement,
    referenceNode: DomElement,
): void => {
    referenceNode.parentNode?.insertBefore(
        inserableNode,
        referenceNode.nextSibling,
    );
};

export const examContent = (content: string, isQuestion = false): string => {
    const domParcer = new DOMParser();
    const contentElem = domParcer.parseFromString(content, 'text/html').body;

    contentElem.childNodes.forEach((elem) => {
        if (elem.nodeName === P_NODE_NAME && elem.firstChild) {
            const childsCount = elem.childNodes.length;
            const firstChildName = elem.firstChild.nodeName;

            if (
                childsCount === 2 &&
                firstChildName === TEXT_NODE_NAME &&
                elem.childNodes[1].nodeName === IMG_NODE_NAME
            ) {
                insertAfter(elem.childNodes[1], elem);
            }

            if (
                childsCount === 2 &&
                firstChildName === IMG_NODE_NAME &&
                elem.childNodes[1].nodeName === BR_NODE_NAME
            ) {
                elem.removeChild(elem.childNodes[1]);
            }

            if (childsCount === 1 && firstChildName === IMG_NODE_NAME) {
                !isQuestion
                    ? contentElem.replaceChild(elem.firstChild, elem)
                    : elem.firstChild.remove();
            }
        }
    });

    return contentElem.innerHTML;
};

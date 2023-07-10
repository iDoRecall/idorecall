export const getFragment = (innerContent: string): DocumentFragment => {
    const fragment = document.createDocumentFragment();
    const plug = document.createElement('div');
    plug.innerHTML = innerContent;
    fragment.appendChild(plug);
    return fragment;
};

export const getFragment = (innerContent: string): DocumentFragment => {
    const fragment = createFragment();
    fragment.createDiv({ text: innerContent });
    return fragment;
};

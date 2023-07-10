export const setAppWrapperWithoutHeader = (withoutHeader: boolean): void => {
    document.body
        .querySelector('#idr-app')
        ?.classList.toggle('no-header', withoutHeader);
};

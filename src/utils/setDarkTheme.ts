export const setDarkTheme = (isDark: boolean): void => {
    document.body.querySelector('#idr-app')?.classList.toggle('dark', isDark);
};

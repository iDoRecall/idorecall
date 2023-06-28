export function handleFormula(el: HTMLDivElement): void {
    const f = el.querySelectorAll('math');
    if (f.length) {
        Array.from(f).map((e) => {
            e.remove();
            return e;
        });
    }
}

class T {
    lang: string;

    all = {
        en: {
            styles: {
                bold: 'Bold',
                italics: 'Italics',
                strikethrough: 'Strikethrough',
                code: 'Code',
                link: 'Web Link',
                blocklink: 'Link to Note',
                textColor: 'Text Color',
                highlight: 'Highlight',
            },
        },
    };

    constructor() {
        this.lang = localStorage.getItem('language') as string;
    }

    get texts(): typeof this.all.en {
        return this.all['en'];
    }
}

export default new T().texts;

class T {
    lang: string;

    all = {
        en: {
            styles: {
                qNA: 'To question and answer',
                toQuestion: 'To question',
                toAnswer: 'To answer',
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

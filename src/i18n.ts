class T {
    // lang = localStorage.getItem('language') as string;

    all = {
        en: {
            styles: {
                toQuestionAndAnswer: 'To question and answer',
                toQuestion: 'To question',
                toAnswer: 'To answer',
            },
        },
    };

    get texts(): typeof this.all.en {
        return this.all['en'];
    }
}

export default new T().texts;

/**
 * Represents a word.
 */
class Word extends String {
    /**
     * Creates a new instance of Word.
     * @param {String} word - A sequence of characters representing a word.
     */
    constructor(word: string) {
        super(word);
    }

    /**
     * Indicates whether this word is in singular form.
     * @returns {boolean} True if the word is singular; otherwise, false.
     */
    isSingular() {
        return this.endsWith('ss') || this.endsWith('s') === false;
    }

    /**
     * Returns the singular form of this word. 
     * @return {string} The singular form of this word.
     */
    toSingular() {
        let wordInSingular;

        switch (true) {
            case this.endsWith('ies') && this.length > 4:
                // For example: 'entries' and 'countries'.
                wordInSingular = `${this.slice(0, -3)}y`;
                break;
            case this.endsWith('ces'):
                // For example: 'services'.
                wordInSingular = `${this.slice(0, -1)}`;
                break;
            case this.endsWith('ches'):
            case this.endsWith('sses'):
            case this.endsWith('xes'):
                // For example: 'boxes', 'churches' and 'classes'.
                wordInSingular = `${this.slice(0, -2)}`;
                break;
            case this.endsWith('ss'):
                // For example: 'class'.
                wordInSingular = `${this}`;
                break;
            case this.endsWith('s'):
                // For example: 'dogs' and 'pies'.
                wordInSingular = `${this.slice(0, -1)}`;
                break;
            // Word is already in singular form.
            default:
                // For example: 'dog' and 'pie'.
                wordInSingular = `${this}`;
                break;
        }

        return wordInSingular;
    }

    /**
     * Returns the plural form of this word. 
     * @return {string} The plural form of this word.
     */
    toPlural() {
        let wordInPlural;

        switch (true) {
            case this.endsWith('y'):
                // For example: 'entry' and 'country'.
                wordInPlural = `${this.slice(0, -1)}ies`;
                break;
            case this.endsWith('ch'):
            case this.endsWith('ss'):
            case this.endsWith('x'):
                // For example: 'box', 'church' and 'class'.
                wordInPlural = `${this}es`;
                break;
            // Word is already in plural form.
            case this.endsWith('s'):
                // For example: 'dogs' and 'pies'.
                wordInPlural = `${this}`;
                break;
            default:
                // For example: 'dog' and 'pie'.
                wordInPlural = `${this}s`;
                break;
        }

        return wordInPlural;
    }
}
}

export {
    Word,
};
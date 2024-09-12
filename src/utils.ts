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
            default:
                // For example: 'dogs' and 'pies'.
                wordInSingular = `${this.slice(0, -1)}`;
                break;
        }

        return wordInSingular;
    }
}

export {
    Word,
};
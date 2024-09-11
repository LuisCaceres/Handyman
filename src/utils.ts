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
            // For example: 'entries'.
            case this.endsWith('ies'):
                // For example: 'entry'.
                wordInSingular = `${this.slice(0, -3)}y`;
                break;
            // For example: 'services'.
            case this.endsWith('ces'):
                // For example: 'service'.
                wordInSingular = `${this.slice(0, -1)}`;
                break;
            // For example: 'boxes'.            
            case this.endsWith('ches'):
            case this.endsWith('sses'):
            case this.endsWith('xes'):
                // For example: 'box'.
                wordInSingular = `${this.slice(0, -2)}`;
                break;
            default:
                // For example: 'dogs'.
                wordInSingular = `${this.slice(0, -1)}`;
                break;
        }

        return wordInSingular;
    }
}

export {
    Word,
};
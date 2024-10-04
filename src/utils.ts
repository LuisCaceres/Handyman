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

interface Regexes {
    [key: string]: RegExp;
}

// The following are regular expressions that can be used to find an association of symbols in a line of code.
const regexes: Regexes = {
    // Matches `person` and `persons` in `for (const person of persons) {`.
    forOfLoop: /(?<=for\s\(const\s)(?<symbol_1>\w+)\sof\s(?<symbol_2>\w+)/d,
    // Matches `persons` and `person` in `persons.sort((personA, personB));`.
    sortMethod: /(?<symbol_1>\w+)\.sort\(\((?<symbol_2>\w+)\w,\s(?<symbol_3>\w+)\w/d,
    // Matches `persons` and `person` in `persons.forEach(person => {`.
    // Matches `persons` and `person` in `persons.map((person, index) => {`.
    // Matches `persons` and `person` in `persons.push(person);`.
    methodAndCallbackFunction: /(?<symbol_1>\w+)\.\w+\(+(?<symbol_2>\w+)(\)|\s=|,)/d,
};

// A relevant symbol is a symbol that is associated with another symbol.
// For example, in `for (const person of persons) {`, `person` and `persons` are associated symbols.
interface RelevantSymbol {
    // The value of the symbol, for example, `person` or `persons`.
    value: string;
    // The start index of the symbol in a line of code.
    start: number;
    // The end index of the symbol in a line of code.
    end: number;
}

/**
 * Returns a list of symbols that are associated with each other.
 * For example, in `for (const person of persons) {`, `person` and `persons` are symbols associated with each other.
 * @param {text} text - A string of JavaScript or TypeScript code. 
 * @returns {RelevantSymbol[]} A list of symbols that are associated with each other.
 */
function getRelevantSymbols(text: string): RelevantSymbol[] {
    // Let `symbols` be an initially empty list of symbols.
    const relevantSymbols = [];

    // For each regex `regex` in `regexes`.
    for (const regex in regexes) {
        // Let `matches` be a list of matches of `regex` in `text`.
        const matches = Object.values(text.match(regexes[regex])?.indices?.groups || {});

        // For each match `match` in `matches`.
        for (const match of matches) {
            // Let `symbol` be a new symbol.
            const symbol = {
                value: text.slice(match[0], match[1]),
                start: match[0],
                end: match[1],
            };
    
            // Add `symbol` to `symbols`.
            relevantSymbols.push(symbol);
        }

        // Stop iteration if `symbols` already has symbols.
        if (relevantSymbols.length > 0) {
            break;
        }
    }

    // Return `symbols`.
    return relevantSymbols;
}

export {
    getRelevantSymbols,
    Word,
};
import { Tokenizer } from "./languageTokenizer.js";

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
     * Converts the first letter of this word to uppercase.
     * @example new Word('person').capitalize() returns 'Person'.
     * @returns {string} This word with the first letter capitalized.
     */
    capitalize(): string {
        return this[0].toUpperCase() + this.slice(1);
    }

    /**
     * Formats this word so that it's in the same format as `anotherWord`.
     * Supported formats are case (capitalization) and number (singular or plural).
     * @example new Word('accounts').format('Payments') returns 'Accounts'.
     * @example new Word('Accounts').format('payments') returns 'accounts'.
     * @example new Word('accounts').format('Payment') returns 'Account'.
     * @example new Word('Accounts').format('payment') returns 'account'.
     * @param anotherWord - Another word whose format this word will be converted to.
     * @returns {string} This word in the same format as `anotherWord`.
     */
    format(anotherWord: string): string {
        const isCapitalized = new Word(anotherWord).isCapitalized();
        const isSingular = new Word(anotherWord).isSingular();

        let word: string;

        if (isCapitalized) {
            word = this.capitalize();
        } else {
            word = this.uncapitalize();
        }

        if (isSingular) {
            word = new Word(word).toSingular();
        } else {
            word = new Word(word).toPlural();
        }

        return word;
    }

    /**
     * Indicates whether the first letter of this word is capitalized.
     * @example new Word('Person').isCapitilized() returns true.
     * @example new Word('person').isCapitilized() returns false.
     * @returns {boolean} True if the word is capitalized; otherwise, false.
     */
    isCapitalized(): boolean {
        return this.toString() === this.capitalize();
    }

    /**
     * Indicates whether this word is in singular form.
     * @example new Word('person').isSingular() returns true.
     * @example new Word('persons').isSingular() returns false.
     * @returns {boolean} True if the word is singular; otherwise, false.
     */
    isSingular(): boolean {
        return this.endsWith('ss') || this.endsWith('s') === false;
    }

    /**
     * Indicates whether this word is in uppercase form.
     * @example new Word('PERSON').isUpperCase() returns true.
     * @example new Word('person').isUpperCase() returns false.
     * @returns {boolean} True if the word is in uppercase; otherwise, false.
     */
    isUpperCase(): boolean {
        return this.toString() === this.toUpperCase();
    }

    /**
     * Returns the singular form of this word.
     * @example new Word('boxes').toSingular() returns 'box'.
     * @example new Word('countries').toSingular() returns 'country'.
     * @return {string} The singular form of this word.
     */
    toSingular(): string {
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
     * @example new Word('box').toPlural() returns 'boxes'.
     * @example new Word('country').toPlural() returns 'countries'.
     * @return {string} The plural form of this word.
     */
    toPlural(): string {
        let wordInPlural;

        switch (true) {
            case this.endsWith('ife'):
                // For example: 'life' and 'wife'.
                wordInPlural = `${this.slice(0, -2)}ves`;
                break;
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

    /**
     * Converts the first letter of this word to lowercase.
     * @example new Word('Person').uncapitalize() returns 'person'.
     * @returns {string} This word with the first letter uncapitalized.
     */
    uncapitalize(): string {
        return this[0].toLowerCase() + this.slice(1);
    }
}

interface Regexes {
    [key: string]: RegExp;
}

// The following are regular expressions that can be used to find symbols in a line of code.
const regexes: Regexes = {
    // Matches `elements` and `document` in `const elements = document.querySelectorAll('p') as HTMLElement[]`.
    // Matches `a` in `let a: string`.
    // Matches `a` in `a.b`.
    // Matches `a` and `c` in `\`${a} and ${c}\``.
    // Matches `a` and `c` in `a(c)`.
    // Matches `a` and `c` in `a.b(c)`.
    // Matches `a` and `c` in `a = c`.
    // Matches `a` and `c` in `[a, c]`.
    // Matches `a` in `if (a) {`.
    identifier: /(?<!\.([A-Za-z]+)?)(\w+)(?=\s*[.,;:=)}|&\]])/g,
    // Matches `person` and `persons` in `const person = persons[0];`.
    // Matches `person` and `persons` in `for (const person of persons) {`.
    // Matches `persons`, `sort`, `person and `person` in `persons.sort((person1, person2));`.
    // Matches `persons`, `forEach` and `person` in `persons.forEach(person => {`.
    // Matches `persons`, `map`, `person` and `index` in `persons.map((person, index) => {`.
    // Matches `persons`, `push` and `person` in `persons.push(person);`.
    symbols: /[A-Za-z]\w*(?=\W)/gd,
};

/** A symbol is the name of a valid variable, token or identifier in JavaScript
 * or TypeScript code.
 * For example, `person` and `persons` are symbols in line of code `for (const
 * person of persons) {`.
 */
interface SymbolInformation {
    // The name of a symbol, for example, `box`, `boxes` or `largeBoxes`.
    value: string;
    // The start index of the name of the symbol in a line of code.
    start: number;
    noun: NounInformation;
}

/**
 * Returns a list of symbols in `text` that are associated with `noun`. For
 * example, given the noun `task` and the line of code `tasks.push(task)` then the list of associated symbols includes `tasks` and `task`.
 * @param example `getRelevantSymbols('task', 'for (const task of tasks)')` returns `[{value: 'task'}, {value: 'tasks'}]`.
 * @param example `getRelevantSymbols('task', 'const task = tasks.find(task => task.startsWith('t'));')` returns `[{value: 'task'}, {value: 'tasks'}, {value: 'task'}]`.
 * @param noun - A noun is a word that represents a person or an object.
 * @param text - A string of JavaScript or TypeScript code.
 * @returns A list of symbols that are associated with each other.
 */
function getRelevantSymbols(noun: string, text: string): SymbolInformation[] {
    // Let `singular` be the singular form of `noun`.
    const singular = new Word(noun).toSingular().toUpperCase();
    // Let `plural` be the plural form of `noun`.
    const plural = new Word(noun).toPlural().toUpperCase();
    // Let `relevantSymbols` be an initially empty list of symbols associated with `symbol`.
    const relevantSymbols: SymbolInformation[] = [];

    // For each regex `regex` in `regexes`.
    for (const regex in regexes) {
        // Let `symbols` be a list of symbols in `text`.
        const symbols = getSymbols(text);

        // For each symbol `symbol` in `symbols`.
        for (const symbol of symbols) {
            // Let `anotherNoun` be `symbol`'s noun.
            const anotherNoun = symbol.noun.value.toUpperCase();

            // Ignore `symbol` if `anotherNoun` has no correlation with `noun`.
            if (anotherNoun !== singular && anotherNoun !== plural) {
                continue;
            }

            const duplicate = relevantSymbols.find(relevantSymbol => relevantSymbol.start === symbol.start);

            // Ignore `symbol` if `symbol` is already in `relevantSymbols`.
            if (duplicate) {
                continue;
            }

            // Otherwise add `symbol` to `relevantSymbols`.
            relevantSymbols.push(symbol);
        }
    }

    // Return `symbols`.
    return relevantSymbols;
}

/**
 * Returns a list of symbols in `text` that `regex` matches.
 * @example getSymbols('for (const task of tasks) {', regex) returns [{value: 'task'}, {value: 'tasks'}]
 * @param text - A string of JavaScript or TypeScript code.
 * @returns A list of symbols in `text` that `regex` matches.
 */
function getSymbols(text: string): SymbolInformation[] {
    // Let `symbols` be an initially empty list of symbols.
    const symbols: SymbolInformation[] = [];
    // Let `matches` be a list of matches in `text` that `regex` matches.
    const matches = new Tokenizer(text).getTokensByType('variable');

    // For each match `match` in `matches`.
    for (const match of matches) {
        const value = match.substring;

        // Let `symbol` be a new symbol.
        const symbol: SymbolInformation = {
            noun: getNounInformation(value),
            start: match.startIndex,
            value,
        };

        // Add `symbol` to `symbols`.
        symbols.push(symbol);
    }

    // Return `symbols`.
    return symbols;
}

/**
 * Splits `symbol` into meaningful parts. For example, `symbol` may consist of words and numbers.
 * @example getParts('account') returns ['account'].
 * @example getParts('discountedItems') returns ['discounted', 'Items'].
 * @example getParts('container1') returns ['container', '1'].
 * @param symbol - The name of a valid identifier, token or variable in JavaScript or TypeScript.
 * @returns {string[]} A list of parts that `symbol` consists of.
 */
function getParts(symbol: string): string[] {
    const regex = /([$_\d]+|\B(?=[A-Z]))/;
    // Let `parts` be a list of meaningful parts that `symbol` consists of.
    // Remove any parts from `parts` that are equal to an empty string.
    const parts = symbol.split(regex).filter(part => part.length > 0);
    // Return `parts`.
    return parts;
}

interface NounInformation {
    // The name of the noun of a symbol. For example, 'person',
    value: string;
    // The symbol that `name` is part of.
    symbol?: string;
    // A list of parts that `symbol` consists of.
    parts: string[];
    // The index of `name` in `parts`.
    index: number;
}

/** Returns information about the noun of `symbol`. It's assumed that `symbol`
 * always has a noun. A noun is a word that represents a person or an object.
 * @example getNounInformation('account') returns {name: 'account', parts: ['account'], index: 0}.
 * @example getNounInformation('discountedItems') returns {name: 'Items', parts: ['discounted', 'Items'], index: 1}.
 * @example getNounInformation('container1') returns {name: 'container', parts: ['container', '1'], index: 0}.
 * @param symbol - The name of a valid identifier, token or variable in JavaScript or TypeScript.
 * @returns Information about the noun of `symbol`.
 */
function getNounInformation(symbol: string): NounInformation {
    // It matches a word that only consists of letters.
    const regex = /[A-Za-z]/;
    // Let `parts` be a list of parts that `symbol` consists of.
    const parts = getParts(symbol);
    // Let `noun` be the last word in `symbol`.
    const index = parts.findLastIndex(part => part.match(regex));
    // Let `value` be the noun of `symbol`.
    const value = parts[index];
    // Let `nounInformation` be information about the noun of `symbol`.
    const nounInformation: NounInformation = { parts, index, value };
    // Return `nounInformation`.
    return nounInformation;
}

/**
 * Replaces the noun of `symbol` with another noun `noun`. The case and number of `noun` must be the same as the noun of `symbol`.
 * @example formatSymbol('bankAccounts', 'receipts') returns 'bankReceipts'.
 * @example formatSymbol('bankAccount', 'receipts') returns 'bankReceipt'.
 * @example formatSymbol('bankAccount', 'receipt') returns 'bankReceipt'.
 * @example formatSymbol('bankAccounts', 'receipt') returns 'bankReceipts'.
 * @param symbol - The name of a valid identifier, token or variable in JavaScript or TypeScript.
 * @param noun - A word that represents a noun. For example, `box`, 'bag', 'drawers' or `containers`.
 * @returns {string} `symbol` with its noun replaced by `noun`.
 */
function formatSymbol(symbol: string, noun: string): string {
    const nounInformation = getNounInformation(symbol);
    // Let `formattedNoun` be `noun` that has the same format as the noun of `symbol`.
    const formattedNoun = new Word(noun).format(nounInformation.value);
    const parts = nounInformation.parts.slice();
    // Remove `symbol`'s current noun and replace it with `formattedNoun`.
    parts[nounInformation.index] = formattedNoun;
    const formattedSymbol = parts.join('');
    // Return `symbol`.
    return formattedSymbol;
}

export {
    formatSymbol,
    getNounInformation,
    getParts,
    getRelevantSymbols,
    getSymbols,
    regexes,
    Word,
};
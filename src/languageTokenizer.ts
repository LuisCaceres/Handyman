/* The following piece of code gets a text mate grammar to tokenize lines of code into meaningful tokens. This VSCode extension can then further personalise the developer experience by detecting the type of token at a specific line and character locatiom and reacting accordingly.*/

import * as fs from "fs/promises";
import { default as oniguruma } from "vscode-oniguruma";
import { IToken, ITokenizeLineResult, default as textMate } from "vscode-textmate";

const rootFolder = 'C:/Users/chemi/Documents/Repositories/Handyman/';
const path1 = `${rootFolder}node_modules/vscode-oniguruma/release/onig.wasm`;
const path2 = `${rootFolder}src/text-mate-grammars/TypeScript.tmLanguage`;

const wasmBinary = await fs.readFile(path1);

const regexEngine = await oniguruma.loadWASM(wasmBinary).then(() => {
    return {
        createOnigScanner(patterns) {
            return new oniguruma.OnigScanner(patterns);
        },
        createOnigString(s) {
            return new oniguruma.OnigString(s);
        }
    };
});

// Create a registry that can create a grammar from a scope name.
const registry = new textMate.Registry({
    loadGrammar: async (scopeName) => {
        // if (scopeName === 'source.ts') {
        const data = await fs.readFile(path2);
        const grammar = textMate.parseRawGrammar(data.toString());
        return grammar;
        // }
    },
    onigLib: regexEngine,
});

// Load the JavaScript grammar and any other grammars included by it async.
const grammar = await registry.loadGrammar('source.ts') as textMate.IGrammar;

interface Token extends IToken {
    substring: string
}

// An instance of a tokenizer breaks a string of code into tokens. These tokens can then be retrieved to understand the structure of a line of code. For example, `const elements = {};` consists of several tokens including token `elements` of type `variable`.
class Tokenizer {
    static #types: Map<string, Set<string>> = new Map([
        ['variable',
            new Set([
                'meta.definition.variable.ts',
                'variable.other.object.ts',
                'variable.other.readwrite.ts',
                'variable.parameter.ts',
            ]),
        ]
    ]);

    // Let `string` be the string of code associated with this tokenizer.
    #string: string;
    // Let `result` be the list of tokens from `string`.
    #result: ITokenizeLineResult;

    /**
     * Creates an instance of a tokenizer
     * @param string - The string of code to associated with the tokenizer
     */
    constructor(string: string) {
        this.#result = grammar.tokenizeLine(string, textMate.INITIAL);
        this.#string = string;

        for (const token of this.#result.tokens) {
            // console.log(`${string.slice(token.startIndex, token.endIndex)} `);
        }
    }

    /**
     * Return a list of tokens of type `type`
     * @example
     * `new Tokenizer('const items = button.querySelector(selector);')
     * .getType('variable')`
     * returns
     * `[{'substring: items'}, {substring: 'button'}, {substring:  selector}']`.
     * @param type - The token type. For example, `variable`, `parameter`.
     * @returns A list of tokens.
     */
    getTokensByType(type: string): Token[] {
        // Let `tokens` be an initially empty list of tokens.
        const tokens: Token[] = [];

        // If `type` is not a valid type, abort.
        if (Tokenizer.#types.has(type) === false) {
            return tokens;
        }

        const scopes = Tokenizer.#types.get(type) || new Set();
        // Let `relevantTokens` be tokens from this tokenizer list of tokens that are of type `type`.
        const relevantTokens = this.#result.tokens.filter(token =>
            new Set(token.scopes).intersection(scopes).size > 0
        );

        // For each relevant token `relevantToken` of `relevantTokens`.
        for (const relevantToken of relevantTokens) {
            const substring = `${this.#string.slice(relevantToken.startIndex, relevantToken.endIndex)}`;
            // Store the string representation of `token`.
            const token: Token = { substring, ...relevantToken };
            // Add `token` to `tokens`.
            tokens.push(token);
        }

        // Return `tokens`.
        return tokens;
    }
}

export {
    Tokenizer,
};
/* The following piece of code constains functions that, given a string of code, provide a list of code completions. */

// The module 'vscode' contains the VS Code extensibility API.
import * as vscode from 'vscode';
import { Tokenizer } from "./languageTokenizer.js";
import { Word } from './utils.js';

const functions = [

    /**
     * Suggest code completions related to logging to the console taking into account variables on the line of code immediately above the line on which the caret is located.
     * @param file - The current file
     * @param position - The position of the caret in `file`.
     * @returns A list of code completions
     */
    async function (file: vscode.TextDocument, position: vscode.Position): Promise<vscode.CompletionItem[]> {
        const lineNumber = position.line;
        const currentLine = file.lineAt(lineNumber).text.trim();

        if (currentLine.startsWith('log') && lineNumber > 0) {
            let index = lineNumber - 1;
            let previousLine = file.lineAt(index).text.trim();

            while (previousLine === '') {
                previousLine = file.lineAt(--index).text.trim();
            }

            const { getCompletionItems } = await import('./completionItemProviderFunctions/consoleLog.js');

            return getCompletionItems(previousLine);
        }

        return [];
    },

    /**
     * Suggest code completions related to array methods.
     * @param file - The current file
     * @param position - The position of the caret in `file`.
     * @returns A list of code completions
     */
    async function (file: vscode.TextDocument, position: vscode.Position): Promise<vscode.CompletionItem[]> {
        const currentLine = file.lineAt(position.line).text.trim();
        const tokenizer = new Tokenizer(currentLine);
        const token2 = tokenizer.tokens.at(-2);
        const token1 = tokenizer.getTokensByType('variable').at(-1);

        // If the current line of code ends with a dot (.) and is immediately preceded by a word in plural.
        if ((token2 && token2.substring === '.') &&
            (token1 && new Word(token1.substring).isSingular() === false)) {
            const { getCompletionItems } = await import('./completionItemProviderFunctions/arrayMethods.js');

            return getCompletionItems(token1.substring);
        }

        return [];
    },
];


export { functions };
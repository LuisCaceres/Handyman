/* The following piece of code constains functions that, given a string of code, provide a list of code completions. */

// The module 'vscode' contains the VS Code extensibility API.
import * as vscode from 'vscode';
import { Tokenizer } from "./languageTokenizer.js";
import { getLines } from "./vscodeUtils.js";

const functions = [

    /**
     * Suggest code completions related to logging to the console taking into account variables on the line of code immediately above the line on which the caret is located.
     * @param file - The current file
     * @param position - The position of the caret in `file`.
     * @returns A list of code completions
     */
    async function (file: vscode.TextDocument, position: vscode.Position): Promise<vscode.CompletionItem[]> {
        const completionItems = [];

        const lineNumber = position.line;
        const currentLine = file.lineAt(lineNumber).text.trim();

        if (currentLine.startsWith('log') && lineNumber > 0) {
            // Let `previousLine` be the closest line above `currentLine` that is not a comment or an empty line.
            let previousLine = '';

            for (const line of getLines(file, lineNumber)) {
                const text = line.text.trim();

                if (text !== '' && !text.startsWith('//')) {
                    previousLine = text;
                    break;
                }
            }

            if (previousLine) {
                const { getCompletionItems } = await import('./completionItemProviderFunctions/consoleLog.js');

                completionItems.push(...getCompletionItems(previousLine));
            }

        }

        return completionItems;
    },

    /**
     * Suggest code completions related to array methods.
     * @param file - The current file
     * @param position - The position of the caret in `file`.
     * @returns A list of code completions
     */
    async function (file: vscode.TextDocument, position: vscode.Position): Promise<vscode.CompletionItem[]> {
        // Let `currentLine` be the line on which the cursor is located.
        const currentLine = file.lineAt(position.line).text.slice(0, position.character).trim();

        // Abort if `currentLine`'s last character isn't a dot (.). This means the next token can't be an array method. For example, ` const currentLine = file` where this line of code ends with character `e`.
        if (!currentLine.endsWith('.')) {
            return [];
        }

        // If `currentLine` does end with a dot (.).
        let line = file.lineAt(position.line);
        let index = position.line;
        // Let `lines` be an initially empty list of lines in `file`.
        const lines = [line];

        // For each line `line` that precedes `currentLine`.
        while (line.text.trim().startsWith('.') || index > 0) {
            // Let `line` be the current line.
            /* Add `line` to `lines` if `line` starts with a dot (.), otherwise stop iteration. This is to detect method chaining. For example:

            `items.map(item => item)
                .filter(item => item);`

            */
            lines.push(line);
            line = file.lineAt(index);
            index--;
        }

        const range = lines[0].range.union(lines.at(-1)?.range as vscode.Range);
        // Let `tokens` be a list of all the tokens found in `lines`.
        const tokens = new Tokenizer(file.getText(range));
        const defaultVariableName = 'elements';

        // Let `variables` be a list of variable tokens found in `tokens`.
        const variables = tokens.getTokensByType('variable')
            .map(variable => variable.substring);

        if (!variables.length) {
            variables.push(defaultVariableName);
        }

        const completionItems: vscode.CompletionItem[] = [];

        const { getCompletionItems } = await import('./completionItemProviderFunctions/arrayMethods.js');

        // Generate completion items for each variable in `variables`.
        for (const variable of variables) {
            completionItems.push(...getCompletionItems(variable));
        }

        return completionItems;
    },
];


export { functions };
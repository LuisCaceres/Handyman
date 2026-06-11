/* The following piece of code provides inline code completions. */

// The module 'vscode' contains the VS Code extensibility API.
import * as vscode from "vscode";
import { getPotentialVariable, Word } from "./utils.js";
import { Tokenizer } from "./languageTokenizer.js";
import { getRelevantCodeSnippets } from "./codeActionsProviderData.js";

// Supported language types.
const languages = ["javascript", "typescript", "vue"];

/**
 * Provide a list of code snippets for the given line of code.
 * @param {vscode.TextDocument} file - The current file.
 * @param {vscode.Range} cursor - The current position of the caret.
 * @returns {vscode.InlineCompletionItem[]} - A list of code completions.
 */
function provideInlineCompletionItems(file: vscode.TextDocument, cursor: vscode.Position, context: vscode.InlineCompletionContext): vscode.InlineCompletionItem[] {
    // Let `completionItems` be an initially empty list of completion items.
    const completionItems: vscode.InlineCompletionItem[] = [];
    // Let `line` be the line on which the caret is currently located.
    const line = file.lineAt(cursor.line).text.trim();
    // Let `precedingText` be the text from the beginning of `line` until the the position of the cursor.
    const precedingText = file.lineAt(cursor.line).text.slice(0, cursor.character);

    if (line.endsWith('//')) {
        // Let `nextLine` be the line immediately after `line`.
        const nextLine = file.lineAt(cursor.line + 1).text.trim();
        //  Let `variable` be the name of a variable.
        const variable = nextLine.match(/(?<=(const|let)\s)\w+/)?.[0] || '';
        const insertText = new Word(variable).isSingular() ?
            ` Let \`${variable}\` be ` : ` Let \`${variable}\` be a list of `;

        // Let `completionItem` be a new completion item.
        const completionItem = {
            insertText,
        };

        // Add `completionItem` to `completionItems`.
        completionItems.push(completionItem);
    }

    // Let `potentialVariable` be a word at the cursor's location that may or may not be the name of a variable. At this point, the developer is still typing and this code guesses if the word could be the name of a variable.
    const potentialVariable = getPotentialVariable(precedingText);

    if (potentialVariable) {
        const start = new vscode.Position(0, 0);
        const code = file.getText(new vscode.Range(start, cursor));
        const tokenizer = new Tokenizer(code);

        // Let `variables` be a list of all the variables names that exist up to the cursor's position in `file`.
        const variables = [...new Set(tokenizer.getTokensByType('variable')
            .map(token => token.substring))]
            // Remove any variables that don't start with the same characters as `potentialVariable`. For example, if `potentialVariable` is `ele` then variable name `items` is removed but `elements` isn't.
            .filter(variable => variable.startsWith(potentialVariable))
            // Remove the last variable which is the word at the cursor's position. For example, `ele` shouldn't be in the list of variables as this is the word the developer is currently typing.
            .slice(0, -1);

        if (variables.length) {
            // For each variable `variable` in `variables`.
            for (const variable of variables) {
                // Let `completionItem` be a new inline completion item.
                const completionItem = {
                    insertText: variable,
                    // Let `range` be the exact location at which the ghost text appears in `line`.
                    range: new vscode.Range(cursor.translate(0, -potentialVariable.length), cursor),
                };

                // Add `completionItem` to `completionItems`.
                completionItems.push(completionItem);
            }
        }
    }

    return completionItems;
}

const inlineCompletionProvider = vscode.languages.registerInlineCompletionItemProvider(
    languages, {
    provideInlineCompletionItems,
}
);

export { inlineCompletionProvider };
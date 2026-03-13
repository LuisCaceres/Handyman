/* The following piece of code provides inline code completions. */

// The module 'vscode' contains the VS Code extensibility API.
import * as vscode from "vscode";
import { Word } from "./utils.js";
import { getRelevantCodeSnippets } from "./codeActionsProviderData.js";

// Supported language types.
const languages = ["javascript", "typescript", "vue"];

/**
 * Provide a list of code snippets for the given line of code.
 * @param {vscode.TextDocument} file - The current file.
 * @param {vscode.Range} position - The current position of the caret.
 * @returns {vscode.InlineCompletionItem[]} - A list of code completions.
 */
function provideInlineCompletionItems(file: vscode.TextDocument, position: vscode.Position, context: vscode.InlineCompletionContext): vscode.InlineCompletionItem[] {
    // Let `completionItems` be an initially empty list of completion items.
    const completionItems = [];
    // Let `line` be the line on which the caret is currently located.
    const line = file.lineAt(position.line).text.trim();

    if (line.endsWith('//')) {
        // Let `nextLine` be the line immediately after `line`.
        const nextLine = file.lineAt(position.line + 1).text.trim();
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

    return completionItems;
}

const inlineCompletionProvider = vscode.languages.registerInlineCompletionItemProvider(
    languages, {
    provideInlineCompletionItems,
}
);

export { inlineCompletionProvider };
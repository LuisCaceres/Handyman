/* The following piece of code provides inline code completions. */

// The module 'vscode' contains the VS Code extensibility API.
import * as vscode from "vscode";
// Let `dataSets` be a list of data sets each of which containing information about code snippets.
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
    // Let `text` be the text of the line on which the caret is located. 
    const text = file.lineAt(position.line).text.trim();

    if (text.startsWith('//')) {
        // Let `completionItem` be a new completion item.
        const completionItem = {
            insertText: ' Let `` be',
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
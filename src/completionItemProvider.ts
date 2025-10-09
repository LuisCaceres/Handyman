/* The following piece of code provides a list of code completions. */

// The module 'vscode' contains the VS Code extensibility API.
import * as vscode from "vscode";

// Supported language types.
const languages = ["javascript", "typescript", "vue"];

// Let `functions` be a list of functions that get code completions.
import { functions } from "./completionItemProviderData.js";

/**
 * Provide a list of completion items given `position` and characters the developer is typing.
 * @param {vscode.TextDocument} file - The current file.
 * @param {vscode.Range} position - The current position of the caret within `file`.
 * @returns {vscode.CompletionItem[]} - A list of code completions.
 */
async function provideCompletionItems(file: vscode.TextDocument,
    position: vscode.Position, token: vscode.CancellationToken,
    context: vscode.CompletionContext): Promise<vscode.CompletionItem[]> {

    // Let `completionItems` be an initially empty list of completion items.
    const completionItems: vscode.CompletionItem[] = [];

    for (const fnction of functions) {
        completionItems.push(...await fnction(file, position));
    }

    return completionItems;
}

const completionProvider = vscode.languages.registerCompletionItemProvider(
    languages, {
    provideCompletionItems,
}
);

export { completionProvider };
/* The following piece of code provides a list of code completions. */

// The module 'vscode' contains the VS Code extensibility API.
import * as vscode from "vscode";
import { regexes } from "./utils.js";
import { foo } from "./languageTokenizer.js";

foo;

// Let `dataSets` be a list of data sets each of which containing information about code snippets.
import { getRelevantCodeSnippets } from "./codeActionsProviderData.js";

// Supported language types.
const languages = ["javascript", "typescript", "vue"];

/**
 * Provide a list of completion items given `position` and characters the developer is typing.
 * @param {vscode.TextDocument} file - The current file.
 * @param {vscode.Range} position - The current position of the caret within `file`.
 * @returns {vscode.CompletionItem[]} - A list of code completions.
 */
function provideCompletionItems(file: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.CompletionItem[] {
    // Let `completionItems` be an initially empty list of completion items.
    const completionItems: vscode.CompletionItem[] = [];

    const lines = {
        current: file.lineAt(position.line),
        // TO DO: GET PREVIOUS NON EMTPY LINE OF TEXT
        previous: file.lineAt(position.line - 1),
        next: file.lineAt(position.line + 1)
        // TO DO: GET NEXT NON EMPTY LINE OF TEXT
    };

    // Let `currentText` be the text of the line on which the caret is located.
    const currentText = lines.current.text.trim();
    // Let `nextText` be the text of the line on which the caret is located.
    const nextText = lines.next.text.trim();

    // Let `words` be variable names that the previous line has.
    const words = new Set(lines.previous.text.trim().match(regexes.identifier) || []);

    // If there are words in `words`.
    if (words?.size) {

        // For each `word` in `words`.
        for (const word of words) {
            // Let `completionItem` be a new completion item.
            const completionItem: vscode.CompletionItem = {
                insertText: `console.log('${word}:\\n', ${word});`,
                kind: 14,
                label: `log(${word})`,
                sortText: word,
            };

            // Add `completionItem` to `completionItems`.
            completionItems.push(completionItem);

            /*${ if (currentText.startsWith('//') && nextText.startsWith('const')) {
                    const variable = nextText.match(/(?<=const\s)\w+/)?.[0] || '';
                    // Let `completionItem` be a new completion item.
                    const completionItem: vscode.CompletionItem = {
                        insertText: ` Let \`${variable}\` be `,
                        label: '',
                    };

                    // Add `completionItem` to `completionItems`.
                    completionItems.push(completionItem);
                }}*/
        }
    }

    return completionItems;
}

const completionProvider = vscode.languages.registerCompletionItemProvider(
    languages, {
    provideCompletionItems,
}
);

export { completionProvider };
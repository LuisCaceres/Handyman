/* The following piece of code provides a list of code completions. */

// The module 'vscode' contains the VS Code extensibility API.
import * as vscode from "vscode";
// Let `dataSets` be a list of data sets each of which containing information about code snippets.
import { getRelevantCodeSnippets } from "./codeActionsProviderData";

// Supported language types.
const languages = ["javascript", "typescript", "vue"];

const regexes = {
    // For example, it matches `elements` in `const elements = [];`
    identifier: /(?<=(?:const|let)\s+)(\w+)(?=\s+=)/,
};

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

    // Let `word` be the name of used for a variable declaration, if any.
    const word = lines.previous.text.trim().match(regexes.identifier)?.[0] || '';

    if (word) {
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

    return completionItems;
}

const completionProvider = vscode.languages.registerCompletionItemProvider(
    languages, {
    provideCompletionItems,
}
);

export { completionProvider };
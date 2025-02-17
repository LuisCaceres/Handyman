/* The following piece of code provides code snippets based on the position of the caret in the file.
If a code snippet is selected then it will be inserted below the current line of code. */

// The module 'vscode' contains the VS Code extensibility API.
import * as vscode from "vscode";
// Let `dataSets` be a list of data sets each of which containing information about code snippets.
import { getRelevantCodeSnippets } from "./codeActionsProviderData";

// Supported language types.
const languages = ["javascript", "typescript", "vue"];

/**
 * Provide a list of code snippets for the given line of code.
 * @param {vscode.TextDocument} file - The current file.
 * @param {vscode.Range} position - The current position of the caret.
 * @returns {vscode.CodeAction[]} - A list of code snippets.
 */
function provideCodeActions(file: vscode.TextDocument, position: vscode.Range) {
    // Let `line` be the line of code on which the caret is located.
    const line = file.lineAt(position.start);
    // Let `text` be the text currently selected or the text of `line`.
    const text = file.getText(position) || line.text;
    // Let `word` be the word within which the caret is located.
    const word = file.getText(file.getWordRangeAtPosition(position.start)); 
    
    // Let `codeSnippets` be a list of code snippets that are relevant to `line`.
    const codeSnippets = {...getRelevantCodeSnippets(word), ...getRelevantCodeSnippets(text)};
    // Let `codeActions` be an initially empty list of VS Code code actions.
    const codeActions = [];

    // For each `codeSnippet` in `codeSnippets`.
    for (const title in codeSnippets) {
        // Let `codeAction` be a new code action.
        const codeAction = new vscode.CodeAction(
            title,
            vscode.CodeActionKind.Refactor
        );
        codeAction.edit = new vscode.WorkspaceEdit();

        // If there's a selection of text.
        if (position.isEmpty) {
            // Insert `codeSnippet` below `line` when `codeAction` is selected.
            codeAction.edit.insert(file.uri, line.range.end, codeSnippets[title].snippet);
        }
        // Otherwise
        else {
            //Replace `position` with `codeSnippet` when `codeAction` is selected.
            codeAction.edit.replace(file.uri, position, codeSnippets[title].snippet);
        }

        // Format the file to avoid inconsistent levels of indentation.
        codeAction.command = {
            command: "editor.action.formatDocument",
            title: "Format Document",
        };
        // Add `codeAction` to `codeActions`.
        codeActions.push(codeAction);
    }

    // Return `codeActions`.
    return codeActions;
}

const codeActionsProvider = vscode.languages.registerCodeActionsProvider(
    languages,
    { provideCodeActions }
);

export { codeActionsProvider };
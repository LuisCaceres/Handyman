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
    // Let `codeSnippets` be a list of code snippets that are relevant to `line`.
    const codeSnippets = getRelevantCodeSnippets(line.text);
    // Let `codeActions` be an initially empty list of VS Code code actions.
    const codeActions = [];

    // For each `codeSnippet` in `codeSnippets`.
    for (const codeSnippet of codeSnippets) {
        // Let `codeAction` be a new code action.
        const codeAction = new vscode.CodeAction(
            codeSnippet.title,
            vscode.CodeActionKind.Refactor
        );
        codeAction.edit = new vscode.WorkspaceEdit();
        // If `codeAction` is selected then insert `codeSnippet` below `line`.
        codeAction.edit.insert(file.uri, line.range.end, codeSnippet.snippet);
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
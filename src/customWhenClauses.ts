// The following piece of code creates custom when clauses. This clauses can then be referenced to extend VS Code's functionality. For example:
// "when": "editorTextFocus && editorHasSelection && handyman.editorHasSingleLineSelection && (editorLangId ==  javascript || editorLangId ==  typescript)"

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

function setCustomWhenClauses(): void {

    // Verify if the current selection is within a single line of code.
    vscode.window.onDidChangeTextEditorSelection(e => {
        const isSingleLine = e.selections[0].isSingleLine;
        vscode.commands.executeCommand('setContext', 'handyman.editorHasSingleLineSelection', isSingleLine);
    });
}

export {
    setCustomWhenClauses,
};
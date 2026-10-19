/* The following code automtatically highlights certain tokens in languages such as HTML, CSS, and JavaScript. This occurs as the cursor moves along a line of code. Whatever text is highlighted can be deleted by pressing the `delete` key.

Why? Because I often have to delete tokens such as HTML attributes and values. Without this code, I have to manually select tokens with the keyboard which is error prone. */

// The module 'vscode' contains the VS Code extensibility API.
import * as vscode from "vscode";

const regexes = {
    // HTML
    // Matches `id="foo"` in ` id="foo"></p>`.
    attributeAndValue: /(?<=\s)([a-zA-Z0-9:._-]+?)(=)(".*?)"/y,
    // Matches `foo` in ` id="foo"></p>`.
    value: /(?<==").+?(?=")/y,
};

const decorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: new vscode.ThemeColor(
        'editor.wordHighlightBackground'),
});

// let currentRange: vscode.Range | null = null;
let range: vscode.Range | null | undefined;

vscode.window.onDidChangeTextEditorSelection(async event => {
    range = null;
    const editor = event.textEditor;
    const selection = editor.selection;

    if (!selection.isEmpty) {
        return;
    }

    const file = editor.document;
    const position = selection.active;

    const line = file.lineAt(position.line).text;

    for (const regex of Object.values(regexes)) {
        regex.lastIndex = position.character;
        const match = line.match(regex);

        if (match) {
            const start = position;
            const end = new vscode.Position(position.line, position.character + match[0].length);

            range = new vscode.Range(start, end);
            break;
        }
    }

    if (!range) {
        range = file.getWordRangeAtPosition(position);
    }

    editor.setDecorations(decorationType, range ? [range] : []);

    vscode.commands.executeCommand(
        'setContext',
        'handyman.smartHighlighter.hasHighlight',
        Boolean(range),
    );

    return;
});

const commandHandler = async () => {
    const editor = vscode.window.activeTextEditor!;

    if (!range) {
        return;
    }

    await editor.edit(editBuilder => {
        editBuilder.delete(range!);
    });
}

const name = 'handyman.smartHighlighter.deleteHighlight';
const command = vscode.commands.registerCommand(name, commandHandler);

export {
    command
}
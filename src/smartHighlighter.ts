/* The following code automatically highlights "interesting" code in languages such as HTML, CSS, and JavaScript. Highlighting occurs whe the cursor moves along a line of code and an "interesting" piece code is detected. Whatever code gets highlighted can be deleted by pressing the `delete` key. The `escape` key can be pressed to remove highlighting.

Why? VS Code applies highlighting but it's limited. I often have to highlight text manually to delete it (for example, an attribute and its value in an HTML file). Manually highlighting text is error prone and it doesn't make me efficient. */

// The module 'vscode' contains the VS Code extensibility API.
import * as vscode from "vscode";
import { findMatchingPair } from "./commands/findMatchingPair.js";

// Let `regexes` be a collection of regular expressions used to identify "interesting" code patterns in different languages.
const regexes: Record<string, Record<string, RegExp>> = {
    html: {
        // Matches `id="foo"` in ` id="foo"></p>`.
        attributeAndValue: /(?<=\s)([a-zA-Z0-9:._-]+?)(=)(".*?)"/y,
        // Matches `foo` in ` id="foo"></p>`.
        value: /(?<==").+?(?=")/y,
        // Matches `foo` in `<p>foo</p>`.
        textNode: /(?<=>)[\w\W]+?(?=<)/y,
    },
    typescript: {
    },
    delimiters: {
        // Matches a start delimiter such as `<`, `[`, `{`, or `(`.
        typescript: /[<\[\{\(]/y,
    }
};

// Let `decorationType` be the visual style applied to highlighted code ranges.
const decorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: new vscode.ThemeColor(
        'editor.wordHighlightBackground'),
});

// Let `range` be the range of text currently highlighted by the smart highlighter.
let range: vscode.Range | null | undefined;
// Let `currentLineLength` be the length of the line currently under the cursor.
let currentLineLength: number;

vscode.window.onDidChangeTextEditorSelection(async event => {
    const editor = event.textEditor;
    const selection = editor.selection;

    // If there is code currently selected, do not apply highlighting and abort.
    if (!selection.isEmpty) {
        return;
    }

    const file = editor.document;
    const position = selection.active;
    const line = file.lineAt(position.line).text;

    // If the cursor is still within the previously highlighted range and the line length hasn't changed, do not reapply highlighting and abort.
    if (currentLineLength === line.length && range?.contains(position)) {
        return;
    }

    currentLineLength = line.length;

    const character = line[position.character];

    // If there is white space character under the cursor, do not apply highlighting and abort.
    if (!character || character === ' ') {
        return;
    }

    // From this point onward, attempt to apply highlighting.
    range = null;
    const language = file.languageId;

    // Iterate over all regular expressions defined for the current language and attempt to match them against the current line at the cursor position.
    for (const regex of Object.values(regexes[language] || {})) {
        regex.lastIndex = position.character;
        const match = line.match(regex);

        if (match) {
            const start = position;
            const end = new vscode.Position(position.line, position.character + match[0].length);

            range = new vscode.Range(start, end);
            break;
        }
    }

    // If the previous step did not yield a range to highlight, check if the character at the cursor position is a start delimiter and attempt to find the matching end delimiter to highlight the range in between.
    if (!range) {
        // If the character at the cursor is a start delimiter, find the end delimiter and obtain the range in between the two delimiters.
        const regex = regexes.delimiters[language];
        regex.lastIndex = position.character;
        const match = line.match(regex);

        if (match) {
            const text = editor.document.getText();
            const index = editor.document.offsetAt(position)
            const delimiter = findMatchingPair(text, index);
            const start = position.translate(0, 1);
            const end = editor.document.positionAt(delimiter - 1);
            range = new vscode.Range(start, end);
        }
    }

    // If the previous steps did not yield a range to highlight, attempt to highlight the word at the cursor position.
    if (!range) {
        range = file.getWordRangeAtPosition(position);
    }

    // Apply highlighting to the determined range, otherwise remove any existing highlighting.
    editor.setDecorations(decorationType, range ? [range] : []);

    // Update the context so that keyboard bindings to delete a range and remove highlighting still work.
    vscode.commands.executeCommand(
        'setContext',
        'handyman.smartHighlighter.hasHighlight',
        Boolean(range),
    );

    return;
});

// Command handler to delete code that is currently highlighted.
const deleteHighlight = async () => {
    const editor = vscode.window.activeTextEditor!;

    if (!range) {
        return;
    }

    await editor.edit(editBuilder => {
        editBuilder.delete(range!);
    });
}

const name1 = 'handyman.smartHighlighter.deleteHighlight';
const command1 = vscode.commands.registerCommand(name1, deleteHighlight);

// Command handler to visually remove the current highlight without deleting the highlighted code. This is convenient if the smart highlighter is highlighting unwanted code.
const removeHighlight = async () => {
    const editor = vscode.window.activeTextEditor!;
    editor.setDecorations(decorationType, []);
    range = null;

    vscode.commands.executeCommand(
        'setContext',
        'handyman.smartHighlighter.hasHighlight',
        false,
    );
}

const name2 = 'handyman.smartHighlighter.removeHighlight';
const command2 = vscode.commands.registerCommand(name2, removeHighlight);

export {
    command1,
    command2
}
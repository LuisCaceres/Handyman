/* The following code automatically highlights "interesting" code in languages such as HTML, CSS, and JavaScript. Highlighting occurs whe the cursor moves along a line of code and an "interesting" piece code is detected. Whatever code gets highlighted can be deleted by pressing the `delete` key. The `escape` key can be pressed to remove highlighting.

Why? VS Code applies highlighting but it's limited. I often have to highlight text manually to delete it (for example, an attribute and its value in an HTML file). Manually highlighting text is error prone and it doesn't make me efficient. */

// The module 'vscode' contains the VS Code extensibility API.
import * as vscode from "vscode";
import { findMatchingPair } from "./commands/findMatchingPair.js";

// Command handler to delete code that is currently highlighted.
const deleteHighlight = async () => {
    if (!range) {
        return;
    }

    const editor = vscode.window.activeTextEditor!;

    await editor.edit(editBuilder => {
        editBuilder.delete(range!);
    });

    // Check if white space characters can be merged at the current position.
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

const name3 = 'handyman.smartHighlighter.copyHighlight';
// Command handler to copy the currently highlighted code to the clipboard. This allows users to quickly copy the highlighted text without manually selecting it.
const copyHighlight = async () => {
    if (!range) {
        return;
    }

    const editor = vscode.window.activeTextEditor!;
    const text = editor.document.getText(range);
    await vscode.env.clipboard.writeText(text);
}

const command3 = vscode.commands.registerCommand(name3, copyHighlight);

const name4 = 'handyman.smartHighlighter.cutHighlight';
// Command handler to cut the currently highlighted code to the clipboard. This allows users to quickly move the highlighted text without manually selecting it.
const cutHighlight = async () => {
    if (!range) {
        return;
    }

    const editor = vscode.window.activeTextEditor!;
    const text = editor.document.getText(range);
    await vscode.env.clipboard.writeText(text);
    await editor.edit(editBuilder => {
        editBuilder.delete(range!);
    });
}

const command4 = vscode.commands.registerCommand(name4, cutHighlight);

const relevantCharacters = [
    `{`,
    `[`,
];

// Let `regexes` be a collection of regular expressions used to identify "interesting" code patterns in different languages.
const regexes: Record<string, Record<string, RegExp>> = {
    css: {
        // Matches any CSS selector before the opening curly brace `{`. For example, matches `div` in `div { color: red; }`.
        selector: /.+?(?=\s{)/y,
    },
    html: {
        // Matches `id="foo"` in ` id="foo"></p>`.
        attributeAndValue: /(?<=\s)[a-zA-Z0-9:._-]+?=".*?"\s?/y,
        // Matches `foo` in ` id="foo"></p>`.
        value: /(?<==").+?(?=")/y,
        // Matches `foo` in `<p>foo</p>`.
        textNode: /(?<=>)[\w\W]+?(?=<)/y,
    },
    typescript: {
    },
    delimiters: {
        // Matches any character (including the end of the line) immediately following a start delimiter. For example, matches `a` in `{a}`.
        css: /(?<={)(.|$)/sy,
        // Matches any character (including the end of the line) immediately following a start delimiter. For example, matches `a` in `{a}`.
        typescript: /(?<=[<\[\{\(])(.|$)/sy,
    },
    miscellaneous: {
        // Matches any non-white-space character, useful for finding the next character after an end delimiter. For example, matches `c` in `} \n const`.
        nonWhiteSpaceCharacter: /\S/g
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

// Remove the current smart highlight when the developer adds or removes characters in the document. It means the smart highlight isn't useful.
vscode.workspace.onDidChangeTextDocument(removeHighlight);

vscode.window.onDidChangeTextEditorSelection(async event => {
    const editor = event.textEditor;
    const selection = editor.selection;

    // If the developer is currently selecting code, do not attempt to apply smart highlight and abort.
    if (!selection.isEmpty) {
        // Remove any existing smart highlight.
        removeHighlight();
        return;
    }

    const file = editor.document;
    const position = selection.active;
    const line = file.lineAt(position.line);
    const text = file.lineAt(position.line).text;

    // If the cursor is still within the previously highlighted range and the line length hasn't changed, do not reapply highlighting and abort.
    if (currentLineLength === text.length && range?.contains(position)) {
        return;
    }

    currentLineLength = text.length;

    // If line only contains whitespace characters, do not attempt to apply a smart highlight and abort.
    if (text.trim() === '') {
        return;
    }

    const character = text[position.character];

    // If there is white space character under the cursor, do not apply highlighting and abort.
    if (character === ' ') {
        return;
    }

    // From this point onward, attempt to apply highlighting.
    range = null;

    const cursorIsAtLineStart = position.character === line.firstNonWhitespaceCharacterIndex;

    // If the cursor is at the start of the line and the line ends with a start delimiter, attempt to find the matching end delimiter and highlight code from the start of the line until the end delimiter.
    if (cursorIsAtLineStart) {
        const lineEndsWithDelimiter = relevantCharacters.some(character =>
            text.trim().endsWith(character)
        );

        if (lineEndsWithDelimiter) {
            const startDelimiter = file.offsetAt(line.range.end);
            const text = file.getText();
            const endDelimiter = findMatchingPair(text, startDelimiter - 1);

            const regex = regexes.miscellaneous.nonWhiteSpaceCharacter;
            regex.lastIndex = endDelimiter + 1;

            // Let `nextCharacter` be the next non-white space character after the delimiter.
            let nextCharacter = regex.exec(text)?.index;

            const start = position;
            const end = file.positionAt(nextCharacter || endDelimiter + 1);
            range = new vscode.Range(start, end);
        }
    }

    const language = file.languageId;

    // If the previous steps did not yield a range to highlight, iterate over all regular expressions defined for the current language and attempt to match them against the current line at the cursor position.
    if (!range) {
        for (const regex of Object.values(regexes[language] || {})) {
            regex.lastIndex = position.character;
            const match = text.match(regex);

            if (match) {
                const start = position;
                const end = new vscode.Position(position.line, position.character + match[0].length);

                range = new vscode.Range(start, end);
                break;
            }
        }
    }

    // If the previous step did not yield a range to highlight, check if the character at the cursor position is a start delimiter and attempt to find the matching end delimiter to highlight the range in between.
    if (!range) {
        // If the character at the cursor is a start delimiter, find the end delimiter and obtain the range in between the two delimiters.
        const regex = regexes.delimiters[language];
        regex.lastIndex = position.character;
        const match = text.match(regex);

        if (match) {
            const text = file.getText();
            const index = file.offsetAt(position);
            const delimiter = findMatchingPair(text, index - 1);
            const start = position;
            const end = file.positionAt(delimiter);
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

export {
    command1,
    command2,
    command3,
    command4
}
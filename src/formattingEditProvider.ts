/* The following piece of code formats a file. */

// The module 'vscode' contains the VS Code extensibility API.
import * as vscode from "vscode";
import { Token, Tokenizer } from "./languageTokenizer.js";

// Supported language types.
const languages = ["javascript", "typescript", "vue"];

// Let `functions` be a list of functions that format a file.
// import { functions } from "./completionItemProviderData.js";

/** Format a file.
 * @param file
 * @param options
 * @param token
 * @returns
 */
async function provideDocumentFormattingEdits(file: vscode.TextDocument, options: vscode.FormattingOptions, token: vscode.CancellationToken): Promise<vscode.TextEdit[]> {
    // Let `edits` be a list of edits to be applied to `file`.
    const edits: vscode.TextEdit[] = [];
    const cursor = vscode.window.activeTextEditor?.selection.active as vscode.Position;
    // Let `code` be the line of code on which the cursor is located.
    const code = file.lineAt(cursor.line).text;

    if (code.includes('.querySelectorAll(')) {
        const tokenizer = new Tokenizer(code);
        const tokens = tokenizer.tokens;
        // Let `method` be the token representing the `querySelectorAll` method.
        const method = tokens
            .find(token => token.substring === 'querySelectorAll') as Token;
        // Let `variable` be the name of the variable that calls `method`.
        const variable = tokenizer.getTokensByType('variable')
            .findLast((token, index) => index < method.startIndex) as Token;

        // If the line of code has already been formatted, abort.
        if (code[variable.startIndex - 1] !== '.') {
            // Let `closingBrace` be the closing brace of `method`.
            const closingBrace = tokens.find(token =>
                token.substring === ')' && token.startIndex > method.endIndex
            ) as Token;

            const start = variable.startIndex;
            const end = closingBrace.endIndex;
            const position1 = new vscode.Position(cursor.line, start);
            const position2 = new vscode.Position(cursor.line, end);
            // Let `currentCode` be the code within `code` starting from `variable` and ending at `closingBrace`.
            const currentCode = new vscode.Range(position1, position2);
            // Let `newCode` be `currentCode` formatted.
            const newCode = `[...${code.substring(start, end)}]`;
            // Replace `currentCode` with `newCode`.
            const edit = new vscode.TextEdit(currentCode, newCode);
            edits.push(edit);
        }

    }

    return edits;
}

const formattingEditProvider = vscode.languages.registerDocumentFormattingEditProvider(
    languages, {
    provideDocumentFormattingEdits,
}
);

export { formattingEditProvider };
/* The following piece of code formats a file. */

// The module 'vscode' contains the VS Code extensibility API.
import * as vscode from "vscode";
import { Token, Tokenizer } from "./languageTokenizer.js";
import { Word } from "./utils.js";

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
    // Let `line` be the line of code on which the cursor is located.
    const line = file.lineAt(cursor.line).text;
    const tokenizer = new Tokenizer(line);
    const tokens = tokenizer.tokens;

    // TO DO: Include other array-like structure such as `document.stylesheets`.
    if (line.includes('.querySelectorAll(')) {
        // Let `method` be the token representing the `querySelectorAll` method.
        const method = tokens
            .find(token => token.substring === 'querySelectorAll') as Token;
        // Let `variable` be the name of the variable that calls `method`.
        const variable = tokenizer.getTokensByType('variable')
            .findLast((token, index) => index < method.startIndex) as Token;

        // If the line of code has already been formatted, abort.
        if (line[variable.startIndex - 1] !== '.') {
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
            const newCode = `[...${line.substring(start, end)}]`;
            // Replace `currentCode` with `newCode`.
            const edit = new vscode.TextEdit(currentCode, newCode);
            edits.push(edit);
        }
    }

    // If `code` has string literals (not to be confused with string templates.)
    if (tokenizer.getTokensByType('string literal').length) {
        // Let `strings` be the a list of string literals in `code`.
        const strings = tokenizer.getTokensByType('string literal')
            .filter(string => !['\'', '"'].includes(string.substring));

        // For each string `string` in `strings`.
        for (const string of strings) {
            // Escape each backtick character (`) in `string`.
            // Replace the quotation marks (single or double) on either side of `string` with a backtick character (`).
            const start = string.startIndex - 1;
            const end = string.endIndex + 1;
            const position1 = new vscode.Position(cursor.line, start);
            const position2 = new vscode.Position(cursor.line, end);
            const currentCode = new vscode.Range(position1, position2);
            const newCode = `\`${string.substring.replaceAll('`', '\\`')}\``;
            const edit = new vscode.TextEdit(currentCode, newCode);
            edits.push(edit);
        }
    }

    // If `code` starts with the string `forof`, it means the developer wants a for... of loop.
    if (line.trim().startsWith('forof')) {
        // Let `collection` be the name of the array, map, set or collection.
        const collection = line.trim().split(/\s+/).find(word => word !== 'forof');
        // Let `singular` be `collection` transformed to a word in singular.
        const singular = new Word(collection || '').toSingular();

        const start = 0;
        const end = line.length;
        const position1 = new vscode.Position(cursor.line, start);
        const position2 = new vscode.Position(cursor.line, end);
        const currentCode = new vscode.Range(position1, position2);
        /** Let `newCode` be a for... of loop that iterates over `collection`. */
        const newCode = `for (const ${singular} of ${collection}) {
            ${singular};
        }`;
        // Replace `code` with `newCode`.
        const edit = new vscode.TextEdit(currentCode, newCode);
        edits.push(edit);
    }

    /* If `line` is a variable declaration and the comment immediately above no longer has the same variable name, it means the developer has just renamed the variable name. The developer wants variable names in a declaration and associated comment to match. For example:

    Let `element` be an element.
    const item = '';
    */
    {
        // Let `comment` be the nearest comment for a variable declaration. `comment` must precede `line`.
        const comment = file.lineAt(cursor.line - 1);

        if (comment.text.includes('// Let `')) {
            // Let `variable1` be the variable name in `comment`.
            const variable1 = comment.text.match(/(?<=`)\w+(?=`)/);
            // Let `variable2` be the variable name in `line`.
            const variable2 = tokenizer.getTokensByType('variable')[0];
            // If `variable1` is not the same as `variable2`, it means the developer renamed `variable2` and it no longer matches with `variable1` located in the comment immediately above.
            if (variable1 && variable2 &&
                variable1[0] !== variable2.substring) {
                const start = variable1.index as number;
                const end = start + variable1[0].length;
                const position1 = new vscode.Position(comment.lineNumber, start);
                const position2 = new vscode.Position(comment.lineNumber, end);
                const currentCode = new vscode.Range(position1, position2);
                const newCode = variable2.substring;

                // Update `variable1` so that it's the same as `variable2`.
                const edit = new vscode.TextEdit(currentCode, newCode);
                edits.push(edit);

                // TO DO: Update every occurance of `variable2` in a comment in `file`.
            }
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
import * as vscode from "vscode";

/**
 * Get each line that precedes `anchorLine`, one at a time.
 * @param file - A file with code.
 * @param anchorLine - The line number from which this function starts to return lines (in descending order).
 * @example getLines(file, 5) // returns lines 4, 3, 2, 1 and 0
 */
function* getLines(file: vscode.TextDocument, anchorLine: number) {
    let counter = anchorLine;

    while (counter > 0) {
        yield file.lineAt(--counter);
    }
}

export {
    getLines
};
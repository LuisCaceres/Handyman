/* 
This piece of code provides a rename provider that is smarter than the one provided by default on VS Code.
This smarter rename provided performs the following:
* Renames variables in single-line comments.
* Renames variables in function parameters.
* Renames variables in for... of loops.

For example, consider an array called `countries`. Further below, the array is
iterated over using several methods such as `forEach`, `map`, and `for... of` 
loops. Consider the following code snippet:

// Let `countries` be an initially empty array of countries.
const countries = [];

countries.forEach(country => {
  // Do something with `map`.
});

countries.forEach((country, index) => {
  // Do something with `map`.
});

for (const country of countries) {
  // Do something with `map`.
}

If `countries` is renamed to `states`, the identifier `country` won't be 
renamed to `state`by default on VS Code. In this instance, `states` is more 
descriptive than `countries`. Therefore, the smarter rename provider will 
rename `country` to `state` as well. This includes identifiers in single-line 
comments.
*/

import * as vscode from "vscode";
import { getRelevantSymbols, Word } from "./utils";

interface TextEdit {
    range: vscode.Range;
    replacement: string
}

const identifier = 'myExtension.renameSymbol';

async function commandHandler(): Promise<void> {
    const activeTextEditor = vscode.window.activeTextEditor;

    if (!activeTextEditor) {
        return;
    }

    // Let `file` be the currently active file.
    const file = activeTextEditor.document;
    // Let `symbol` be the identifier, token or variable to be renamed.
    // Let `oldName` be the current name of `symbol`.
    const range = file.getWordRangeAtPosition(activeTextEditor.selection.start);

    if (!range) {
        return;
    }

    const oldName = file.getText(range);
    // Let `newName` be the new name for `symbol`.
    const newName = new Word((await vscode.window.showInputBox({value: oldName}))?.trim() || '');

    // Abort if the developer did not provide a new name.
    if (newName.length === 0) {
        return;
    }

    // Let `textEdits` be an initially empty list of text edits.
    const textEdits: TextEdit[] = [];

    async function createTextEdits(range: vscode.Range, oldName: string) {
        // Let `locations` be a list of locations in which `relevantSymbol` appears in `file`.
        const locations: vscode.Location[] = await vscode.commands.executeCommand("vscode.executeReferenceProvider", file.uri, range.start);

        // For each location `location` in `locations`.
        for (const location of locations) {
            const end = new vscode.Position(location.range.end.line, location.range.start.character + oldName.length);
            // Let `edit` be a new text edit specifying how to replace `relevantSymbol` at `location`.
            const textEdit: TextEdit = {
                range: new vscode.Range(location.range.start, end),
                replacement: new Word(oldName).isSingular() ? newName.toSingular() : newName.toPlural(),
            };
            
            // Add `edit` to `edits`.
            textEdits.push(textEdit);
        }

        // For each location `location` in `locations`.
        for (const location of locations) {
            // Let `text` be the text of the line on which `location` appears.
            const lineNumber = location.range.start.line;
            const text = file.lineAt(lineNumber).text;
            // Let `relevantSymbols` be a list of other symbols in `file` to be renamed.
            const relevantSymbols = getRelevantSymbols(oldName, text);
    
            // For each relevant symbol `relevantSymbol` in `relevantSymbols`.
            for (const relevantSymbol of relevantSymbols) {
                const position1 = new vscode.Position(lineNumber, relevantSymbol.start);
                const position2 = new vscode.Position(lineNumber, relevantSymbol.end);
                
                // Skip if `textEdits` already has text edits for `relevantSymbol` otherwise an error is thrown.
                const duplicate = textEdits.find(edit => edit.range.contains(position1));
                
                if (duplicate) {
                    continue;
                }
    
                // Otherwise, get the locations of `relevantSymbol` in `file` and specify text edits for those locations.
                await createTextEdits(new vscode.Range(position1, position2), relevantSymbol.value);
            }
        }
    }

    // Otherwise, get the locations of `symbol` in `file` and specify text edits for those locations.
    await createTextEdits(range, oldName);
 
    activeTextEditor.edit(editBuilder => {
        // For each text edit `textEdit` in `textEdits`.
        for (const textEdit of textEdits) {
            // Replace the text at `textEdit.range` with `textEdit.replacement`.
            editBuilder.replace(textEdit.range, textEdit.replacement);
        }
    });
};

const command = vscode.commands.registerCommand(identifier, commandHandler);

export { command };
/* This piece of code provides a 'rename symbol' command that is smarter than 
the the built-in 'rename symbol' command on VS Code. This smarter rename 
performs the following:

- Renames symbols in single-line comments.
- Renames symbols in function parameters.
- Renames symbols in for... of loops.

For example, an array called `countries`. Further below, the array  
invokes methods such as `forEach`, `map`, and. The array is also traversed with 
a `for... of` loop. Consider the following code snippet:

// Let `countries` be an initially empty array of countries.
const countries = [];

countries.forEach(country => {
  // Do something with `country`.
});

countries.forEach((country, index) => {
  // Do something with `country`.
});

for (const country of countries) {
  // Do something with `country`.
}

If the name of the array is renamed from `countries` to `states`, the variable 
`country` used by the callback functions of the array methods won't be 
automatically renamed to `state` by VS Code. This also applies to the variable 
`country` in the `for... of` loop. On the other hand, the 'smarter 
rename symbol' will rename a variable and associated variables in one go 
avoiding manual and repetitive intervention by the developer. 
*/

import * as vscode from "vscode";
import { formatSymbol, getRelevantSymbols, getNounInformation } from "./utils";

// Instructions to replace a substring with a string in a JavaScript or Typescript file in VS Code.
interface TextEdit {
    // The start and end of the substring.
    range: vscode.Range;
    // A string to replace the substring specified by `range`. 
    replacement: string
}

// Let `identifier` be the name of this command.
const identifier = 'myExtension.renameSymbol';

// Let `commandHandler` be the function handler for this command.
async function commandHandler(): Promise<void> {
    const activeTextEditor = vscode.window.activeTextEditor;

    // Abort this command if there isn't an active file.
    if (!activeTextEditor) {
        return;
    }

    // Let `file` be the currently active file.
    const file = activeTextEditor.document;
    // Let `symbol` be the identifier, token or variable in `file` to rename.
    const range = file.getWordRangeAtPosition(activeTextEditor.selection.start);

    if (!range) {
        return;
    }

    // Let `currentSymbol` be the current name of `symbol`.
    const currentSymbol = file.getText(range);
    // Let `newSymbol` be the new name for `symbol`.
    const newSymbol = (await vscode.window.showInputBox({value: currentSymbol}) || '').trim();

    // Abort this command if the developer did not give a new name for symbol.
    // Abort this command if `newSymbol` is the same as `currentSymbol`.
    if (newSymbol.length === 0 || currentSymbol === newSymbol) {
        return;
    }

    // Let `newNoun` be the noun of `newSymbol`.
    const newNoun = getNounInformation(newSymbol);
    // Let `textEdits` be an initially empty list of text edits.
    const textEdits: TextEdit[] = [];

    /**
     * Returns intructions to replace ocurrences of `currentSymbol` in `file`. 
     * @param currentSymbol - The symbol to be renamed. This is the name of the identifier, token or variable in to rename.
     * @param position - The location of `currentSymbol` in `file`. 
     */
    async function createTextEdits(currentSymbol: string, position: vscode.Position): Promise<void> {
        // Let `locations` be a list of locations in which `currentSymbol` appears in `file`.
        const locations: vscode.Location[] = await vscode.commands.executeCommand("vscode.executeReferenceProvider", file.uri, position);

        // For each location `location` in `locations`.
        for (const location of locations) {
            // Let `edit` be a new text edit specifying how to replace `relevantSymbol` at `location`.
            const textEdit: TextEdit = {
                range: location.range,
                replacement: formatSymbol(currentSymbol, newNoun.name),
            };
            
            // Add `edit` to `edits`.
            textEdits.push(textEdit);
        }

        // Let `currentNoun` be the noun of `currentSymbol`.
        const currentNoun = getNounInformation(currentSymbol).name;

        // For each location `location` in `locations`.
        for (const location of locations) {
            // Let `text` be the text of the line on which `location` appears.
            const lineNumber = location.range.start.line;
            const text = file.lineAt(lineNumber).text;
            // Let `relevantSymbols` be a list of symbols associated with `currentNoun` in `text`. Those symbols will be renamed too. 
            const relevantSymbols = getRelevantSymbols(currentNoun, text);
    
            // For each relevant symbol `relevantSymbol` in `relevantSymbols`.
            for (const relevantSymbol of relevantSymbols) {
                const anotherPosition = new vscode.Position(lineNumber, relevantSymbol.start);
                
                // Skip if `textEdits` already has text edits for `relevantSymbol` otherwise an error is thrown by VS Code.
                const duplicate = textEdits.find(edit => edit.range.contains(anotherPosition));
                
                if (duplicate) {
                    continue;
                }
    
                // Otherwise, get the locations of `relevantSymbol` in `file` and specify text edits for those locations.
                await createTextEdits(relevantSymbol.value, anotherPosition);
            }
        }
    }

    // Get the locations of `oldSymbol` and associated symbols in `file` and specify text edits for those locations.
    await createTextEdits(currentSymbol, range.start);
 
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
/* I quite frequently paste JavaScript code into the console of an Internet browser. The code is originally written as TypeScript which is then compiled to JavaScript. More often than not, I mix up a TypeScript file with its JavaScript equivalent. Sometimes I inadvertently edit a JavaScript file when in fact I should be editing the TypeScript one.

The following piece of code copies the contents of a TypeScript file and adds it to a hidden TypeScript file part in this extension repository. Then TypeScript compiles the file into JavaScript code. Then the JavaScript code is copied to the clipboard which I can then paste into the console of an Internet browser. */

import * as vscode from "vscode";
import * as fs from "fs/promises";

// Let `identifier` be the name of this command.
const identifier = 'myExtension.copyAsJavaScript';
const command = vscode.commands.registerCommand(identifier, commandHandler);

// Let `commandHandler` be the function handler for this command.
async function commandHandler(): Promise<void> {
    const activeTextEditor = vscode.window.activeTextEditor as vscode.TextEditor;
    // Let `file` be the currently active file.
    const file = activeTextEditor?.document;
    // Let `selection` be the currently selected code, if any.
    const selection = activeTextEditor?.selection;
    // Let `path` be the path to `hiddenFile`.
    const path = {
        start: 'C:/Users/chemi/Documents/Repositories/Handyman/',
        end: '/toBeUsedByCopyAsJavaScript'
    };

    // Let `code` the currenty selected code in `file`, otherwise, let it be the entire contents of `file`.
    const code = selection.isEmpty ? file.getText() : file.getText(selection);
    // Erase the contents of `hiddenFile`.
    // Add `code` to `hiddenFile`.
    await fs.writeFile(`${path.start}src${path.end}.ts`, code);
    // Give TypeScript enough time to compile to JavaScript code.
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Let `javaScriptFile` be `typeScriptFile` compiled to a JavaScript file.
    const javaScriptFile = await fs.readFile(`${path.start}out${path.end}.js`);
    // Copy the contents of `javaScriptFile` to the clipboard.
    await vscode.env.clipboard.writeText(javaScriptFile.toString());
    // Let the developer know that the contents have been successfully copied.
    vscode.window.showInformationMessage('TypeScript copied as JavaScript code!');
}

export { command };
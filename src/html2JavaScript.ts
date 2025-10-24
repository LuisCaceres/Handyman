/* I quite frequently paste JavaScript code into the console of an Internet browser. The code is originally written as TypeScript which is then compiled to JavaScript. More often than not, I mix up a TypeScript file with its JavaScript equivalent. Sometimes I inadvertently edit a JavaScript file when in fact I should be editing the TypeScript one. 

The following piece of code copies the content of a TypeScript file and adds it to the clipboard as JavaScript code which I can then paste into the console of an Internet browser. */

import * as vscode from "vscode";

// Let `identifier` be the name of this command.
const identifier = 'myExtension.htmlToJavaScript';
const command = vscode.commands.registerCommand(identifier, commandHandler);

// Let `commandHandler` be the function handler for this command.

async function commandHandler(): Promise<void> {
    const workspace = vscode.workspace;
    const fileSystem = workspace.fs;2

    // Let `HtmlFile` be the current file.
    const HtmlFile = vscode.window.activeTextEditor?.document.uri;

    if (HtmlFile) {
        // Let `filePath` be the file path of `HtmlFile`.  
        const filePath = HtmlFile.path;
        // Let `folder` be the folder in which `HtmlFile` is located.
        const folder = filePath.substring(0, filePath.lastIndexOf('/'));
        // Let `contents` be the content of `HtmlFile`.
        const contents = await fileSystem.readFile(HtmlFile);
        // Let `TypeScriptFile` be the URI of the file called `template.ts` located in the same folder as `file`.
        const TypeScriptFile = (await workspace.findFiles(`${folder}template.ts`))[0];
        // Replace the text content of `TypeScriptFile` with `text`.
        await fileSystem.writeFile(TypeScriptFile, contents);
    }
}

export { command };
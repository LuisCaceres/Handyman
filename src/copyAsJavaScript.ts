/* I quite frequently paste JavaScript code into the console of an Internet browser. The code is originally written as TypeScript which is then compiled to JavaScript. More often than not, I mix up a TypeScript file with its JavaScript equivalent. Sometimes I inadvertently edit a JavaScript file when in fact I should be editing the TypeScript one. 

The following piece of code copies the content of a TypeScript file and adds it to the clipboard as JavaScript code which I can then paste into the console of an Internet browser. */

import * as vscode from "vscode";
import { posix } from "path";

// Let `identifier` be the name of this command.
const identifier = 'myExtension.copyAsJavaScript';
const command = vscode.commands.registerCommand(identifier, commandHandler);

// Let `targetFolder` be the name of the folder that contains JavaScript files compiled from TypeScript.
const targetFolder = 'dist'; 

// Let `commandHandler` be the function handler for this command.
async function commandHandler(): Promise<void> {
    // For example, it matches `tree` in `repository/src/tree.ts`.
    const regex = /(?!=\/)[^/]+(?=\.\w+$)/;

    // Let `file` be the currently active TypeScript file.
    const typeScriptFile = vscode.window.activeTextEditor?.document.uri;

    if (!typeScriptFile) {
        return;
    }

    // Let `rootFolder` be the URI of the outermost folder in this workspace. 
    const rootFolder = vscode.workspace.workspaceFolders?.[0].uri;

    if (rootFolder) {
        // Let `fileName` be the name of `typeScriptFile` without the extension.
        const fileName = typeScriptFile.path.match(regex)?.[0];
        // Let `javaScriptFile` be the JavaScript file compiled from `file`.
        // Let `filePath` be the path of `javaScriptFile`.
		const filePath = rootFolder.with({ path: posix.join(rootFolder.path, `/${targetFolder}/${fileName}.js`) });
        const fileData = await vscode.workspace.fs.readFile(filePath);
		const fileContents = Buffer.from(fileData).toString('utf8');
        // Copy the contents of `javaScriptFile` to the clipboard.
        await vscode.env.clipboard.writeText(fileContents);
        // Let the developer know that the contents have been successfully copied.
		vscode.window.showInformationMessage('TypeScript copied as JavaScript code!');
    }
}

export { command };
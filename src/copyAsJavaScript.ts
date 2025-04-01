/* I quite frequently paste JavaScript code into the console of an Internet browser. The code is originally written as TypeScript which is then compiled to JavaScript. More often than not, I mix up a TypeScript file with its JavaScript equivalent. Sometimes I inadvertently edit a JavaScript file when in fact I should be editing the TypeScript one. 

The following piece of code copies the content of a TypeScript file and adds it to the clipboard as JavaScript code which I can then paste into the console of an Internet browser. */

import * as vscode from "vscode";

// Let `identifier` be the name of this command.
const identifier = 'myExtension.copyAsJavaScript';
const command = vscode.commands.registerCommand(identifier, commandHandler);

let tsconfig: string;

// Let `outDirectory` be the name of the folder that contains JavaScript files compiled from TypeScript.
let outDirectory = '';

// Let `commandHandler` be the function handler for this command.
async function commandHandler(): Promise<void> {
    const regexes = {
        // For example, it matches `tree` in `repository/src/tree.ts`.
        fileName: /(?!=\/)[^/]+(?=\.\w+$)/,
        // For example, it matches `dist` in `"outDir": "dist"`.
        outDirectory: /(?<="outDir"\s*:\s*").+?(?=")/,
    };

    // Let `typeScriptFile` be the currently active TypeScript file.
    const typeScriptFile = vscode.window.activeTextEditor?.document.uri;

    if (!typeScriptFile) {
        return;
    }

    // Let `tsconfig` be the the file that has configuration options to compile files to TypeScript.
    tsconfig = tsconfig || await getFile('tsconfig.json');

    if (!tsconfig) {
        return;
    }

    // Let `outDirectory` be the folder into which files will be compiled to TypeScript.
    outDirectory = tsconfig.match(regexes.outDirectory)?.[0] || outDirectory;
   
    if (!outDirectory) {
        return;
    }
    
    // Let `fileName` be the name of `typeScriptFile` without the extension.
    const fileName = typeScriptFile.path.match(regexes.fileName)?.[0];
    // Let `filePath` be the path of `javaScriptFile`.
    const filePath = `${outDirectory}/${fileName}.js`;
    // Let `javaScriptFile` be `typeScriptFile` compiled to a JavaScript file.
    const javaScriptFile = await getFile(filePath);
    // Copy the contents of `javaScriptFile` to the clipboard.
    await vscode.env.clipboard.writeText(javaScriptFile);
    // Let the developer know that the contents have been successfully copied.
    vscode.window.showInformationMessage('TypeScript copied as JavaScript code!');
}

/**
 * Returns the contents of the file in the location indicated by `filePath`.
 * @param filePath - A file path.
 * @returns - The contents of the file.
 */
async function getFile(filePath: string): Promise<string> {
    const workspace = vscode.workspace;
    const uri = (await workspace.findFiles(filePath))[0];
    const buffer = await workspace.fs.readFile(uri);
    const file = Buffer.from(buffer).toString('utf8');

    return file;
}

export { command };
/* I quite frequently paste JavaScript code into the console of an Internet browser. The code is originally written as TypeScript which is then compiled to JavaScript. More often than not, I mix up a TypeScript file with its JavaScript equivalent. Sometimes I inadvertently edit a JavaScript file when in fact I should be editing the TypeScript one.

The following piece of code copies the content of a TypeScript file and adds it to the clipboard as JavaScript code which I can then paste into the console of an Internet browser. */

import * as vscode from "vscode";
import * as path from "path";
import { log } from "console";

// Let `identifier` be the name of this command.
const identifier = 'myExtension.exportFileForEdition';
const command = vscode.commands.registerCommand(identifier, commandHandler);

// Let `targetFolder` be the name of the folder that contains JavaScript files compiled from TypeScript.
const targetFolder = 'dist';

const filePaths = [
    '/dist/accessibility-audit__generate-short-version.js',
    '/dist/accessibility-audit__scripts-for-html-file.js',
    // 'package.json',
    '/dist/server.js',
    '/src/table.css',
];

const destination = '/barbar';

// Let `commandHandler` be the function handler for this command.
async function commandHandler(file: vscode.Uri): Promise<void> {
    if (vscode.workspace.workspaceFolders === undefined) {
        return;
    }

    const we = new vscode.WorkspaceEdit();
    const thisWorkspace = await vscode.workspace.workspaceFolders[0].uri.toString();

    // if you want it to be in some folder under the workspaceFolder: append a folder name
    // const uriBase = `${thisWorkspace}/folderName`;
    // let newUri1 = vscode.Uri.parse(`${uriBase}/index.js`);

    // create a Uri for a file to be created
    const newUri = await vscode.Uri.parse(`${ thisWorkspace }\\myTestIndex.js`);

    // create an edit that will create a file
    await we.createFile(newUri, { ignoreIfExists: false, overwrite: true });

    const fileSystem = vscode.workspace.fs;

    const workspaceFolder = vscode.workspace.workspaceFolders[0].uri;
    const uris: vscode.Uri[] = [];

    for (const filePath of filePaths) {
        const uri = file.with({ path: workspaceFolder.path + filePath });
        uris.push(uri);
    }

    const destinationFolder = workspaceFolder.with({ path: workspaceFolder.path + destination});

    await fileSystem.createDirectory(destinationFolder);

    for (const uri of uris) {
        await fileSystem.copy(uri, destinationFolder);
    }

    // debugger;
    // // For example, it matches `tree` in `repository/src/tree.ts`.
    // const regex = /(?!=\/)[^/]+(?=\.\w+$)/;

    // // Let `file` be the currently active TypeScript file.
    // const typeScriptFile = vscode.window.activeTextEditor?.document.uri;

    // if (!typeScriptFile) {
    //     return;
    // }

    // // Let `rootFolder` be the URI of the outermost folder in this workspace.
    // const rootFolder = vscode.workspace.workspaceFolders?.[0].uri;

    // if (rootFolder) {
    //     // Let `fileName` be the name of `typeScriptFile` without the extension.
    //     const fileName = typeScriptFile.path.match(regex)?.[0];
    //     // Let `javaScriptFile` be the JavaScript file compiled from `file`.
    //     // Let `filePath` be the path of `javaScriptFile`.
    // 	const filePath = rootFolder.with({ path: posix.join(rootFolder.path, `/${targetFolder}/${fileName}.js`) });
    //     const fileData = await vscode.workspace.fs.readFile(filePath);
    // 	const fileContents = Buffer.from(fileData).toString('utf8');
    //     // Copy the contents of `javaScriptFile` to the clipboard.
    //     await vscode.env.clipboard.writeText(fileContents);
    //     // Let the developer know that the contents have been successfully copied.
    // 	vscode.window.showInformationMessage('TypeScript copied as JavaScript code!');
    // }
    // await vscode.commands.executeCommand('vscode.newFolder', BAR);
    // debugger;
    // const foo = vscode.Uri.file('coding');
    // new vscode.Uri();
    // vscode.workspace.fs.createDirectory(foo);
    // vscode.workspace.updateWorkspaceFolders(0,undefined,{uri: vscode.Uri.parse('/path'),name:'New Folder'});
    // vscode.workspace.updateWorkspaceFolders(0, 0, {uri: Uri, name: 'foo'});
    // const content = Buffer.from('Hello world', 'utf-8');
    // await fileSystem.writeFile(uri, content);
    vscode.window.showInformationMessage('Hello world!');
}

export { command };
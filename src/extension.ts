// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { codeActionsProvider } from "./codeActionsProvider";
import { command } from "./renameSymbol";

const providers: vscode.Disposable[] = [];
providers.push(codeActionsProvider);
providers.push(command);

// // This method is called when your extension is activated
// // Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(...providers);
}

// This method is called when your extension is deactivated
export function deactivate() {}

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { codeActionsProvider } from "./codeActionsProvider.js";
import { completionProvider } from "./completionItemProvider.js";
import { setCustomWhenClauses } from "./customWhenClauses.js";
import { inlineCompletionProvider } from "./inlineCompletionItemProvider.js";
import { command as command1 } from "./copyAsJavaScript.js";
import { command as command2 } from "./renameSymbol.js";

const providers: vscode.Disposable[] = [];
providers.push(codeActionsProvider);
providers.push(completionProvider);
providers.push(inlineCompletionProvider);
providers.push(command1);
providers.push(command2);

// // This method is called when your extension is activated
// // Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(...providers);
    setCustomWhenClauses();
}

// This method is called when your extension is deactivated
export function deactivate() {}

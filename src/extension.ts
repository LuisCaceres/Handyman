// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { codeActionsProvider } from "./codeActionsProvider.js";
import { completionProvider } from "./completionItemProvider.js";
import { setCustomWhenClauses } from "./customWhenClauses.js";
import { formattingEditProvider } from "./formattingEditProvider.js";
import { inlineCompletionProvider } from "./inlineCompletionItemProvider.js";

const commands: vscode.Disposable[] = (await Promise.all([
    import('./copyAsJavaScript.js'),
    import('./renameSymbol.js'),
    import('./smartHighlighter.js'),
])).map(module => Object.values(module)).flat();

const providers: vscode.Disposable[] = [];
providers.push(codeActionsProvider);
providers.push(completionProvider);
providers.push(formattingEditProvider);
providers.push(inlineCompletionProvider);
providers.push(...commands);

// // This method is called when your extension is activated
// // Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(...providers);
    setCustomWhenClauses();
}

// This method is called when your extension is deactivated
export function deactivate() { }

/* The following piece of code suggests code completions related to logging to the console taking into account variables on the line of code immediately above the line on which the caret is located.

To see this in action type the word `log` at the very beginning of a line and get Intellisense to display. Please note that you may have to hide Intellisense and display it again for the suggestions to appear on the screen.
*/

import { CompletionItem } from "vscode";
import { Tokenizer } from "./../languageTokenizer.js";

function getCompletionItems(lines: string[]): CompletionItem[] {
    // Let `variables` be an initially empty list variable names found in `lines`.
    const variables: Set<string> = new Set();

    // For each line `line` in `lines`.
    for (const line of lines) {
        const tokenizer = new Tokenizer(line);
        
        for (const token of tokenizer.getTokensByType('variable')) {
            variables.add(token.substring);
        }
    }

    const completionItems: CompletionItem[] = [];

    // For each `variable` in `variables`.
    for (const variable of variables) {
        // Let `completionItem` be a new completion item.
        const completionItem: CompletionItem = {
            insertText: `console.log('${variable}:\\n', ${variable});`,
            kind: 14,
            label: `log(${variable})`,
            sortText: '1',
        };

        // Add `completionItem` to `completionItems`.
        completionItems.push(completionItem);
    }

    return completionItems;
}

export {
    getCompletionItems,
};
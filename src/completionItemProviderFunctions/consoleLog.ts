/* The following piece of code suggests code completions related to logging to the console taking into account variables on the line of code immediately above the line on which the caret is located.

To see this in action type the word `log` at the very beginning of a line and get Intellisense to display. Please note that you may have to hide Intellisense and display it again for the suggestions to appear on the screen.
*/

import { Tokenizer } from "./../languageTokenizer.js";

interface CompletionItem {
    insertText: string,
    kind: number,
    label: string,
    sortText: string,
}

function getCompletionItems(string: string): CompletionItem[] {
    const tokenizer = new Tokenizer(string);
    // Let `variables` be variable names found in `string`.
    const variables = new Set(tokenizer.getTokensByType('variable')
        .map(token => token.substring));

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
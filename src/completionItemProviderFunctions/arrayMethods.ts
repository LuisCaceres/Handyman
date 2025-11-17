/*

The following piece of code suggests code completions related to array methods that expect a callback function as a parameter.

To see this in action type a word in plural followed by a dot (.) Intellisense will then suggest code completions for array methods. Please note that you may have to hide Intellisense and display it again for the suggestions to appear on the screen.

For example:

// Developer types:
`const elements = items.m`
// Intellisense suggests the following code completion.
`items.map((item, index) => {
    // Let `item` be the current item.
    // Let `index` be the numeric position of `item`.
    item;
});

*/

import { Word } from "../utils.js";

interface CompletionItem {
    insertText: string,
    kind: number,
    label: string,
    sortText: string,
}

const methods = [
    'every',
    'filter',
    'find',
    'findIndex',
    'findLast',
    'findLastIndex',
    'flatMap',
    'forEach',
    'map',
    'some',
];

function getCompletionItems(plural: string): CompletionItem[] {
    const completionItems: CompletionItem[] = [];

    const singular = new Word(plural).toSingular();

    for (const method of methods) {
        const completionItem: CompletionItem = {
            insertText: `${method}((${singular}, index) => {
                // Let \`${singular}\` be the current ${singular}.
                // Let \`index\` be the numeric position of \`${singular}\`.
                ${singular};
            });
            `,
            kind: 14,
            label: `${method}(${singular} => {})`,
            sortText: '1',
        };

        completionItems.push(completionItem);
    }

    return completionItems;
}

export {
    getCompletionItems,
};
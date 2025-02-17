// The following file contains code snippets used by the code actions provider.

import { Word } from "./utils.js";

// Let `CodeSnippet` be a code snippet.
interface CodeSnippet {
	title: string;
	snippet: string;
}

// Let `CodeSnippets` be a list of code snippets.
interface CodeSnippets {
    [key: string]: CodeSnippet
}

function getRelevantCodeSnippets(text:string): CodeSnippets {
    // Let `codeSnippets` be an initially empty list of code snippets.
    const codeSnippets: CodeSnippets = {};

    // For each dataSet `dataSet` in `dataSets`.
    for (const dataSet of dataSets) {
        // Let `regex` be the regular expression associated with `dataSet`.
        const regex = dataSet.regex;

        // If `text` matches the pattern described by `regex`.
        if (regex.test(text)) {
            // Let `words` be a list of words in `text` that `regex` matches.
            const words = text.match(regex) || [];
            // Let `codeSnippet` be a code snippet that includes each word in `words`.
            const codeSnippet: CodeSnippet = {
				title: dataSet.title,
				snippet: dataSet.generateCodeSnippet(...words),
			};
            // Add `codeSnippet` to `codeSnippets`.
            codeSnippets[dataSet.title] = codeSnippet;
        }
    }

    return codeSnippets;
}

interface DataSet {
    title: string;
    regex: RegExp;
    generateCodeSnippet: (...variableNames: string[]) => string;
}

// Let `dataSets` be a list of data sets each of which containing information about code snippets.
const dataSets: DataSet[] = [
    {
        title: 'forEach',
        // For example, it matches `elements` in `const elements`.
        // For example, it matches `numbers` in `const numbers: number[] = [];`.
        regex: /^\w+s$/g,
        
        /*  Example of code snippet:
            // For each `element` in `elements`.
            elements.forEach((element, index) => {
                element;
            }); 
        */
        generateCodeSnippet: function (variable) {
            const singular = new Word(variable).toSingular();
            const codeSnippet = `

            // For each ${singular} \`${singular}\` in \`${variable}\`.
            ${variable}.forEach((${singular}, index) => {
                ${singular};
            });
            `;

            return codeSnippet;
        }
    },
    {
        title: 'Insert for... of loop',
        // For example, it matches `elements` in `const elements`.
        // For example, it matches `numbers` in `const numbers: number[] = [];`.
        regex: /^\w+s$/g,
        
        /*  Example of code snippet:
            // For each `element` in `elements`.
            for (const element of elements) {
                element;
            } 
        */
        generateCodeSnippet: function (variable) {
            const singular = new Word(variable).toSingular();
            const codeSnippet = `

            // For each ${singular} '${singular}' in '${variable}'.
            for (const ${singular} of ${variable}) {
                ${singular};
            }
            `;

            return codeSnippet;
        }
    },
    {
        title: 'Add elements to array (push)',
        // For example, it matches `elements` in `const elements = []`.
        // For example, it matches `numbers` in `const numbers: number[] = [];`.
        regex: /^\w+s$/g,

        /* Example of code snippet: 
            const element = ;
            elements.push(element);
        */
        generateCodeSnippet: function (variable) {
            const singular = new Word(variable).toSingular();

            const codeSnippet = `

            const ${singular} = ;
            ${variable}.push(${singular});
            `;

            return codeSnippet;
        }
    },
    {
        title: 'Insert if statement',
        // For example, it matches `elements` in `const elements = []`.
        // For example, it matches `numbers` in `const numbers: number[] = [];`.
        regex: /^\w+s$/g,
        
        /* Example of code snippet:
            if (elements) {} 
        */
        generateCodeSnippet: function (variable) {
            const codeSnippet = `
            
            if (${variable}) {

            }`;

            return codeSnippet;
        }
    },
    {
        title: 'Sort',
        // For example, it matches `elements` in `const elements = [];`.
        // For example, it matches `numbers` in `const numbers: number[] = [];`.
        regex: /^\w+s$/g,

        /* Example of code snippet:
            {
                function toNumber(element) {
                    const value = element;
                    let number;

                    switch (value) {
                        case value:
                            // number = 0;
                            break;
                        default:
                            break;
                    }

                    return number;
                }

                const map = new Map();

                elements.forEach(element => {
                    const number = toNumber(element);
                    map.set(element, number);
                });

                // Sort `elements` accordingly. 
                elements.sort((elementA, elementB) => map.get(elementA) - map.get(elementB));
                elements.reverse();
            }
        */
        generateCodeSnippet: function (variable) {
            const singular = new Word(variable).toSingular();
            const codeSnippet = `

            {
                function toNumber(${singular}) {
                    const value = ${singular};
                    let number;

                    switch (value) {
                        case value:
                            // number = 0;
                            break;
                        default:
                            break;
                    }

                    return number;
                }

                const map = new Map();

                ${variable}.forEach(${singular} => {
                    const number = toNumber(${singular});
                    map.set(${singular}, number);
                });

                // Sort \`${variable}\` accordingly.
                ${variable}.sort((${singular}A, ${singular}B) => map.get(${singular}A) - map.get(${singular}B));
                ${variable}.reverse();
            }`;

            return codeSnippet;
        }
    } 
];

export {
    dataSets,
    getRelevantCodeSnippets,
};
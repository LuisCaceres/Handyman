import {
    dataSets,
    getRelevantCodeSnippets,
} from "../codeActionsProviderData.js";

const expect = chai.expect;

describe("getRelevantCodeSnippets()", function () {
    it("Returns a list of code snippets that are relevant to a line of code.", function () {
        {
            const line = "const elements = []";
            const word = 'elements';
            const codeSnippets = {...getRelevantCodeSnippets(word), ...getRelevantCodeSnippets(line)};

            expect(Object.keys(codeSnippets).length).to.equal(5);
            expect(codeSnippets.hasOwnProperty(
                "Insert for... of loop")).to.equal(true);
            expect(codeSnippets.hasOwnProperty(
                "Add elements to array (push)")).to.equal(true);
            expect(codeSnippets.hasOwnProperty("forEach")).to.equal(true);
            expect(codeSnippets.hasOwnProperty("Insert if statement")).to.equal(true);
            expect(codeSnippets.hasOwnProperty("Sort")).to.equal(true);
        }
        {
            const line = "const textEdits: TextEdit[] = [];";
            const word = 'textEdits';
            const codeSnippets = {...getRelevantCodeSnippets(word), ...getRelevantCodeSnippets(line)};

            expect(Object.keys(codeSnippets).length).to.equal(5);
            expect(codeSnippets.hasOwnProperty("Insert for... of loop"
            )).to.equal(true);
            expect(codeSnippets.hasOwnProperty("Add elements to array (push)"
            )).to.equal(true);
            expect(codeSnippets.hasOwnProperty("forEach")).to.equal(true);
            expect(codeSnippets.hasOwnProperty("Insert if statement")).to.equal(true);
            expect(codeSnippets.hasOwnProperty("Sort")).to.equal(true);
        }
    });

    describe("Given a collection of elements", function () {
        it("It returns a code snippet that is a for... of loop.", function () {
            const snippetTitle = 'Insert for... of loop';
            const lines = [
                'elements',
            ];

            for (const line of lines) {
                const codeSnippets = getRelevantCodeSnippets(line);
                const codeSnippet = codeSnippets[snippetTitle];
                expect(codeSnippet.snippet).to.equal(`

            // For each element 'element' in 'elements'.
            for (const element of elements) {
                element;
            }
            `);
            }
        });

        it("It returns a code snippet based on Array.prototype.forEach()", function () {
            const snippetTitle = 'forEach';
            const lines = [
                'elements',
            ];

            for (const line of lines) {
                const codeSnippets = getRelevantCodeSnippets(line);
                const codeSnippet = codeSnippets[snippetTitle];

            expect(codeSnippet.snippet).to.equal(`

            // For each element \`element\` in \`elements\`.
            elements.forEach((element, index) => {
                element;
            });
            `);
            }
        });

        it("It returns a code snippet that sorts elements in an array.", function () {
            const snippetTitle = 'Sort';
            const lines = [
                'elements',
            ];

            for (const line of lines) {
                const codeSnippets = getRelevantCodeSnippets(line);
                const codeSnippet = codeSnippets[snippetTitle];

            expect(codeSnippet.snippet).to.equal(`

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

                // Sort \`elements\` accordingly.
                elements.sort((elementA, elementB) => map.get(elementA) - map.get(elementB));
                elements.reverse();
            }`);
            }
        });

        it("It returns a code snippet that uses the `push` method to add an element to an array.", function () {
            const snippetTitle = 'Add elements to array (push)';
            const lines = [
                'elements',
            ];

            for (const line of lines) {
                const codeSnippets = getRelevantCodeSnippets(line);
                const codeSnippet = codeSnippets[snippetTitle];

            expect(codeSnippet.snippet).to.equal(`

            const element = ;
            elements.push(element);
            `);
            }
        });

        it("It returns a code snippet that is an if statement.", function () {
            const snippetTitle = 'Insert if statement';
            const lines = [
                'elements',
            ];

            for (const line of lines) {
                const codeSnippets = getRelevantCodeSnippets(line);
                const codeSnippet = codeSnippets[snippetTitle];

            expect(codeSnippet.snippet).to.equal(`
            
            if (elements) {

            }`);
            }
        });
    });

});

import {
    dataSets,
    getRelevantCodeSnippets,
} from "../codeActionsProviderData.js";

const expect = chai.expect;

describe("getRelevantCodeSnippets()", function () {
    it("Returns a list of code snippets that are relevant to a line of code.", function () {
        const line = "const elements = []";
        const codeSnippets = getRelevantCodeSnippets(line);

        expect(codeSnippets.length).to.equal(4);
        expect(codeSnippets.at(0)?.title).to.equal(
            "Insert for... of loop"
        );
        expect(codeSnippets.at(1)?.title).to.equal(
            "Add elements to array (push)"
        );
        expect(codeSnippets.at(2)?.title).to.equal("Insert if statement");
        expect(codeSnippets.at(3)?.title).to.equal("Sort");
    });

    describe("Given a collection of elements", function () {
        it("It returns a code snippet that is a for... of loop.", function () {
            const variable = "elements";
            const dataSet = dataSets.find(dataSet => dataSet.title === "Insert for... of loop");
            const codeSnippet = dataSet?.generateCodeSnippet(variable);

            expect(codeSnippet).to.equal(`

            // For each element 'element' in 'elements'.
            for (const element of elements) {
                element;
            }
            `);
        });

        it("It returns a code snippet that sorts elements in an array.", function () {
            const variable = "elements";
            const dataSet = dataSets.find(dataSet => dataSet.title === "Sort");
            const codeSnippet = dataSet?.generateCodeSnippet(variable);

            expect(codeSnippet).to.equal(`

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
        });

        it("It returns a code snippet that uses the `push` method to add an element to an array.", function () {
            const variable = "elements";
            const dataSet = dataSets.find(dataSet => dataSet.title === "Add elements to array (push)");
            const codeSnippet = dataSet?.generateCodeSnippet(variable);

            expect(codeSnippet).to.equal(`

            const element = ;
            elements.push(element);
            `);
        });

        it("It returns a code snippet that is an if statement.", function () {
            const variable = "elements";
            const dataSet = dataSets.find(dataSet => dataSet.title === "Insert if statement");
            const codeSnippet = dataSet?.generateCodeSnippet(variable);
    
            expect(codeSnippet).to.equal(`
            
            if (elements) {

            }`);
        });
    });

});

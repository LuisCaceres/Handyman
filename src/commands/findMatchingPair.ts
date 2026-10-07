/* Programming languages such as HTML, CSS and JavaScript have delimiters.
For example, CSS and JavaScript use { and } to mark the beginning and end of blocks. Given the a delimiter, the following code finds the matching delimiter in a string. */

const openingCharacters = new Map<string, string>([
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
]);

const closingCharacters = new Map<string, string>(
    [...openingCharacters.entries()]
        .map(([openingCharacter, closingCharacter]) =>
            [closingCharacter, openingCharacter]),
);

/**
 * Returns the index of the matching pair of a delimiter located in `string` at `index`. Supported delimiters are brackets, curly braces and parentheses.
 * @param string A string of code
 * @param index The index of the opening or closing delimiter
 * @returns The index at which the matching delimiter is located in `string`.
 */
function findMatchingPair(string: string, index: number): number {
    let matchingPair = -1;

    if (index < 0 || index >= string.length) {
        return -1;
    }

    const character = string[index];
    let step: number;

    const isOpeningCharacter = openingCharacters.has(character);
    const isClosingCharacter = closingCharacters.has(character);

    if (isOpeningCharacter || isClosingCharacter) {
        const openingCharacter = isOpeningCharacter
            ? character
            : closingCharacters.get(character);

        const closingCharacter = isOpeningCharacter
            ? openingCharacters.get(character)
            : character;

        const step = isOpeningCharacter ? 1 : -1;

        let depth = 1;

        for (index += step; index >= 0 && index < string.length; index += step) {
            const character = string[index];

            if (character === openingCharacter) {
                depth += step;
            }
            else if (character === closingCharacter) {
                depth -= step;
            }

            if (depth === 0) {
                matchingPair = index;
                break;
            }
        }
    }

    return matchingPair;
}

export {
    findMatchingPair
}
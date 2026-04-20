/**
 * Remove Duplicate Letters
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var removeDuplicateLetters = function (s) {
    const characterLastIndices = new Map();
    for (let currentPosition = 0; currentPosition < s.length; currentPosition++) {
        characterLastIndices.set(s[currentPosition], currentPosition);
    }

    const outputStack = [];
    const addedChars = new Set();

    for (let stringIterator = 0; stringIterator < s.length; stringIterator++) {
        const charFromSource = s[stringIterator];

        if (addedChars.has(charFromSource)) {
            continue;
        }

        while (outputStack.length > 0 && outputStack[outputStack.length - 1] > charFromSource && characterLastIndices.get(outputStack[outputStack.length - 1]) > stringIterator) {
            const poppedElement = outputStack.pop();
            addedChars.delete(poppedElement);
        }

        outputStack.push(charFromSource);
        addedChars.add(charFromSource);
    }

    return outputStack.join('');
};
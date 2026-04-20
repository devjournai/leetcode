/**
 * Word Squares
 * Time Complexity: O(N * K^2 + S * K^2)
 * Space Complexity: O(N * K^2 + S * K^2)
 */
var wordSquares = function (words) {
    const finalSquaresList = [];
    const prefixDictionary = new Map();
    const squareDimension = words[0].length;

    for (const inputWord of words) {
        for (let charPointer = 0; charPointer < inputWord.length; charPointer++) {
            const currentSlicedPrefix = inputWord.slice(0, charPointer);
            if (!prefixDictionary.has(currentSlicedPrefix)) {
                prefixDictionary.set(currentSlicedPrefix, []);
            }
            prefixDictionary.get(currentSlicedPrefix).push(inputWord);
        }
    }

    function findWordSquaresRecursive(currentPath) {
        if (currentPath.length === squareDimension) {
            finalSquaresList.push([...currentPath]);
            return;
        }

        const nextPrefixBuilder = [];
        const currentLengthOfPath = currentPath.length;
        for (const existingWord of currentPath) {
            nextPrefixBuilder.push(existingWord[currentLengthOfPath]);
        }
        const targetPrefixString = nextPrefixBuilder.join('');

        const candidateWordsList = prefixDictionary.get(targetPrefixString) || [];
        for (const choiceWord of candidateWordsList) {
            currentPath.push(choiceWord);
            findWordSquaresRecursive(currentPath);
            currentPath.pop();
        }
    }

    for (const firstRowWord of words) {
        findWordSquaresRecursive([firstRowWord]);
    }

    return finalSquaresList;
};
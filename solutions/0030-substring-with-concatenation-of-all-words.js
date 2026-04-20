/**
 * Substring With Concatenation Of All Words
 * Time Complexity: O(N * M * K)
 * Space Complexity: O(M * K + N)
*/
var findSubstring = function (s, words) {
    if (!words || words.length === 0) {
        return [];
    }

    const foundIndices = [];
    const singleWordLength = words[0].length;
    const totalWordsCount = words.length;
    const totalConcatenatedLength = singleWordLength * totalWordsCount;

    if (s.length < totalConcatenatedLength) {
        return [];
    }

    const initialWordFrequencyMap = new Map();
    for (const currentWordEntry of words) {
        initialWordFrequencyMap.set(currentWordEntry, (initialWordFrequencyMap.get(currentWordEntry) || 0) + 1);
    }

    for (let currentWindowStart = 0; currentWindowStart <= s.length - totalConcatenatedLength; currentWindowStart++) {
        const wordsInCurrentWindow = new Map(initialWordFrequencyMap);
        let matchedWordsCounter = 0;

        for (let wordSliceStart = currentWindowStart; wordSliceStart < currentWindowStart + totalConcatenatedLength; wordSliceStart += singleWordLength) {
            const extractedFragment = s.substring(wordSliceStart, wordSliceStart + singleWordLength);

            if (wordsInCurrentWindow.has(extractedFragment) && wordsInCurrentWindow.get(extractedFragment) > 0) {
                wordsInCurrentWindow.set(extractedFragment, wordsInCurrentWindow.get(extractedFragment) - 1);
                matchedWordsCounter++;
            } else {
                break;
            }
        }

        if (matchedWordsCounter === totalWordsCount) {
            foundIndices.push(currentWindowStart);
        }
    }

    return foundIndices;
};
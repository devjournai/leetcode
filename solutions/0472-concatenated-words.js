/**
 * Concatenated Words
 * Time Complexity: O(N * L_max^3)
 * Space Complexity: O(N * L_max)
 */
var findAllConcatenatedWordsInADict = function (words) {
    const availableWordSet = new Set(words);
    const finalConcatenatedCollection = [];

    words.forEach(function (currentExaminedWord) {
        if (currentExaminedWord.length === 0) {
            return;
        }

        const currentWordLength = currentExaminedWord.length;
        const minSegmentCountDP = new Array(currentWordLength + 1).fill(Infinity);
        minSegmentCountDP[0] = 0;

        for (let prefixEndIndex = 1; prefixEndIndex <= currentWordLength; prefixEndIndex++) {
            let segmentStartIndex = 0;
            while (segmentStartIndex < prefixEndIndex) {
                if (minSegmentCountDP[segmentStartIndex] !== Infinity) {
                    const currentStringSegment = currentExaminedWord.substring(segmentStartIndex, prefixEndIndex);
                    if (availableWordSet.has(currentStringSegment)) {
                        minSegmentCountDP[prefixEndIndex] = Math.min(
                            minSegmentCountDP[prefixEndIndex],
                            minSegmentCountDP[segmentStartIndex] + 1
                        );
                    }
                }
                segmentStartIndex++;
            }
        }

        if (minSegmentCountDP[currentWordLength] >= 2) {
            finalConcatenatedCollection.push(currentExaminedWord);
        }
    });

    return finalConcatenatedCollection;
};
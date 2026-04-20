/**
 * Maximum Product Of Word Lengths
 * Time Complexity: O(N * L + N^2)
 * Space Complexity: O(N)
 */
var maxProduct = function (inputWords) {
    const totalWordsCount = inputWords.length;
    if (totalWordsCount < 2) {
        return 0;
    }

    const wordMasksStorage = new Array(totalWordsCount);

    for (let loopIndexOuter = 0; loopIndexOuter < totalWordsCount; loopIndexOuter++) {
        let currentWordString = inputWords[loopIndexOuter];
        let wordSpecificMask = 0;
        for (let charScanIndex = 0; charScanIndex < currentWordString.length; charScanIndex++) {
            let charOffsetValue = currentWordString.charCodeAt(charScanIndex) - 'a'.charCodeAt(0);
            wordSpecificMask |= (1 << charOffsetValue);
        }
        wordMasksStorage[loopIndexOuter] = wordSpecificMask;
    }

    let maximumProductFound = 0;

    for (let firstWordIndex = 0; firstWordIndex < totalWordsCount; firstWordIndex++) {
        for (let secondWordIndex = firstWordIndex + 1; secondWordIndex < totalWordsCount; secondWordIndex++) {
            let firstWordBitmask = wordMasksStorage[firstWordIndex];
            let secondWordBitmask = wordMasksStorage[secondWordIndex];

            if ((firstWordBitmask & secondWordBitmask) === 0) {
                let lengthOfFirstWord = inputWords[firstWordIndex].length;
                let lengthOfSecondWord = inputWords[secondWordIndex].length;
                let potentialProduct = lengthOfFirstWord * lengthOfSecondWord;
                if (potentialProduct > maximumProductFound) {
                    maximumProductFound = potentialProduct;
                }
            }
        }
    }

    return maximumProductFound;
};
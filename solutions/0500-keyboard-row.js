/**
 * Keyboard Row
 * Time Complexity: O(S)
 * Space Complexity: O(S)
*/
var findWords = function (wordsInput) {
    const firstKeySet = new Set(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']);
    const secondKeySet = new Set(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']);
    const thirdKeySet = new Set(['z', 'x', 'c', 'v', 'b', 'n', 'm']);

    const finalResult = [];
    const wordCount = wordsInput.length;

    for (let wordIterator = 0; wordIterator < wordCount; wordIterator++) {
        const currentWordEntry = wordsInput[wordIterator];
        const transformedWord = currentWordEntry.toLowerCase();
        const charCount = transformedWord.length;

        let wordRowIdentifier = 0;
        let isCandidateWord = true;

        for (let charIterator = 0; charIterator < charCount; charIterator++) {
            const individualChar = transformedWord[charIterator];
            let characterRowCheck = 0;

            if (firstKeySet.has(individualChar)) {
                characterRowCheck = 1;
            } else if (secondKeySet.has(individualChar)) {
                characterRowCheck = 2;
            } else if (thirdKeySet.has(individualChar)) {
                characterRowCheck = 3;
            }

            if (wordRowIdentifier === 0) {
                wordRowIdentifier = characterRowCheck;
            } else if (wordRowIdentifier !== characterRowCheck) {
                isCandidateWord = false;
                break;
            }
        }

        if (isCandidateWord) {
            finalResult.push(currentWordEntry);
        }
    }

    return finalResult;
};
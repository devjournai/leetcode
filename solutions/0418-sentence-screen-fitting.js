/**
 * Sentence Screen Fitting
 * Time Complexity: O(N * C + R)
 * Space Complexity: O(N)
*/
var wordsTyping = function (sentence, rows, cols) {
    const totalWordsInSentence = sentence.length;
    const dpFitInfo = new Array(totalWordsInSentence);

    for (let startWordIndex = 0; startWordIndex < totalWordsInSentence; startWordIndex++) {
        let currentRemainingSpace = cols;
        let wordPointerForFitting = startWordIndex;
        let sentencesCompletedCounter = 0;

        while (true) {
            const currentWordLength = sentence[wordPointerForFitting].length;

            if (currentRemainingSpace >= currentWordLength) {
                currentRemainingSpace -= currentWordLength;

                if (wordPointerForFitting === totalWordsInSentence - 1) {
                    sentencesCompletedCounter++;
                    wordPointerForFitting = 0;
                } else {
                    wordPointerForFitting++;
                }

                if (currentRemainingSpace > 0) {
                    currentRemainingSpace--;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        dpFitInfo[startWordIndex] = {
            nextWordStartingIndex: wordPointerForFitting,
            numberOfSentencesCompleted: sentencesCompletedCounter
        };
    }

    let finalSentencesCount = 0;
    let currentSentenceWordPosition = 0;

    for (let rowIterator = 0; rowIterator < rows; rowIterator++) {
        const lineFittingData = dpFitInfo[currentSentenceWordPosition];
        currentSentenceWordPosition = lineFittingData.nextWordStartingIndex;
        finalSentencesCount += lineFittingData.numberOfSentencesCompleted;
    }

    return finalSentencesCount;
};
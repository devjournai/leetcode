/**
 * Valid Word Abbreviation
 * Time Complexity: O(W + A)
 * Space Complexity: O(1)
 */
var validWordAbbreviation = function (fullWord, shortAbbr) {
    let currentWordPosition = 0;
    let currentAbbrPosition = 0;

    while (currentWordPosition < fullWord.length && currentAbbrPosition < shortAbbr.length) {
        let abbreviationCharacter = shortAbbr[currentAbbrPosition];

        if (abbreviationCharacter >= '0' && abbreviationCharacter <= '9') {
            if (abbreviationCharacter === '0') {
                return false;
            }

            let numericSkipValue = 0;
            let digitParsingPointer = currentAbbrPosition;

            while (digitParsingPointer < shortAbbr.length && shortAbbr[digitParsingPointer] >= '0' && shortAbbr[digitParsingPointer] <= '9') {
                numericSkipValue = numericSkipValue * 10 + (shortAbbr[digitParsingPointer] - '0');
                digitParsingPointer++;
            }

            currentAbbrPosition = digitParsingPointer;
            currentWordPosition += numericSkipValue;

        } else {
            if (fullWord[currentWordPosition] === abbreviationCharacter) {
                currentWordPosition++;
                currentAbbrPosition++;
            } else {
                return false;
            }
        }
    }

    return currentWordPosition === fullWord.length && currentAbbrPosition === shortAbbr.length;
};
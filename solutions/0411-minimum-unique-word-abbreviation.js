/**
 * Minimum Unique Word Abbreviation
 * Time Complexity: O(2^N * M * N)
 * Space Complexity: O(M * N)
 */
var minAbbreviation = function (target, dictionary) {
    const targetLengthValue = target.length;
    let minAbbreviationLength = targetLengthValue;
    let bestFoundAbbreviation = target;

    const filteredDictionaryEntries = dictionary.filter(dictWordItem => dictWordItem.length === targetLengthValue);

    for (let currentMaskIteration = 0; currentMaskIteration < (1 << targetLengthValue); currentMaskIteration++) {
        const candidateAbbreviationString = constructAbbreviationFromMask(target, currentMaskIteration);

        if (candidateAbbreviationString.length > minAbbreviationLength) {
            continue;
        }

        let isCurrentAbbrUnique = true;
        for (let dictIndex = 0; dictIndex < filteredDictionaryEntries.length; dictIndex++) {
            const currentDictionaryWord = filteredDictionaryEntries[dictIndex];
            if (testForConflict(candidateAbbreviationString, currentDictionaryWord)) {
                isCurrentAbbrUnique = false;
                break;
            }
        }

        if (isCurrentAbbrUnique) {
            if (candidateAbbreviationString.length < minAbbreviationLength) {
                minAbbreviationLength = candidateAbbreviationString.length;
                bestFoundAbbreviation = candidateAbbreviationString;
            } else if (candidateAbbreviationString.length === minAbbreviationLength) {
                if (candidateAbbreviationString < bestFoundAbbreviation) {
                    bestFoundAbbreviation = candidateAbbreviationString;
                }
            }
        }
    }

    return bestFoundAbbreviation;

    function constructAbbreviationFromMask(originalTargetString, abbreviationMaskValue) {
        let abbreviationResult = '';
        let consecutiveSkippedCount = 0;
        for (let charPosition = 0; charPosition < originalTargetString.length; charPosition++) {
            const bitCheckValue = 1 << charPosition;
            if ((abbreviationMaskValue & bitCheckValue) > 0) {
                if (consecutiveSkippedCount > 0) {
                    abbreviationResult += consecutiveSkippedCount;
                    consecutiveSkippedCount = 0;
                }
                abbreviationResult += originalTargetString[charPosition];
            } else {
                consecutiveSkippedCount++;
            }
        }
        if (consecutiveSkippedCount > 0) {
            abbreviationResult += consecutiveSkippedCount;
        }
        return abbreviationResult;
    }

    function testForConflict(inputAbbreviation, comparisonDictionaryWord) {
        let inputAbbrPointer = 0;
        let comparisonWordPointer = 0;
        while (inputAbbrPointer < inputAbbreviation.length && comparisonWordPointer < comparisonDictionaryWord.length) {
            const currentAbbrCharCheck = inputAbbreviation[inputAbbrPointer];
            if (isNaN(parseInt(currentAbbrCharCheck))) {
                if (currentAbbrCharCheck !== comparisonDictionaryWord[comparisonWordPointer]) {
                    return false;
                }
                inputAbbrPointer++;
                comparisonWordPointer++;
            } else {
                let numberValueFromAbbr = 0;
                while (inputAbbrPointer < inputAbbreviation.length && !isNaN(parseInt(inputAbbreviation[inputAbbrPointer]))) {
                    numberValueFromAbbr = numberValueFromAbbr * 10 + parseInt(inputAbbreviation[inputAbbrPointer]);
                    inputAbbrPointer++;
                }
                comparisonWordPointer += numberValueFromAbbr;
            }
        }
        return inputAbbrPointer === inputAbbreviation.length && comparisonWordPointer === comparisonDictionaryWord.length;
    }
};
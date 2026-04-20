/**
 * Additive Number
 * Time Complexity: O(N^3)
 * Space Complexity: O(N)
 */
var isAdditiveNumber = function (num) {
    const totalStringLength = num.length;

    if (totalStringLength < 3) {
        return false;
    }
    const verifyAdditiveSequence = (currentScanIndex, previousNumberOne, previousNumberTwo, sequenceElementCount) => {
        if (currentScanIndex === totalStringLength) {
            return sequenceElementCount >= 3;
        }

        const calculatedSum = previousNumberOne + previousNumberTwo;
        const calculatedSumString = calculatedSum.toString();
        const sumStringLength = calculatedSumString.length;

        if (currentScanIndex + sumStringLength > totalStringLength ||
            num.substring(currentScanIndex, currentScanIndex + sumStringLength) !== calculatedSumString) {
            return false;
        }

        return verifyAdditiveSequence(currentScanIndex + sumStringLength, previousNumberTwo, calculatedSum, sequenceElementCount + 1);
    };

    for (let firstEndIndex = 0; firstEndIndex < totalStringLength - 2; firstEndIndex++) {
        const firstSegmentValue = num.substring(0, firstEndIndex + 1);
        if (firstSegmentValue.length > 1 && firstSegmentValue[0] === '0') {
            break;
        }
        const firstNumericValue = BigInt(firstSegmentValue);

        for (let secondEndIndex = firstEndIndex + 1; secondEndIndex < totalStringLength - 1; secondEndIndex++) {
            const secondSegmentValue = num.substring(firstEndIndex + 1, secondEndIndex + 1);
            if (secondSegmentValue.length > 1 && secondSegmentValue[0] === '0') {
                break;
            }
            const secondNumericValue = BigInt(secondSegmentValue);

            if (verifyAdditiveSequence(secondEndIndex + 1, firstNumericValue, secondNumericValue, 2)) {
                return true;
            }
        }
    }

    return false;
};
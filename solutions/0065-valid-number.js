/**
 * Valid Number
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var isNumber = function (s) {
    const trimmedInput = s.trim();
    const inputLength = trimmedInput.length;

    if (inputLength === 0) {
        return false;
    }

    let currentPointerIndex = 0;
    let hasSeenAnyDigit = false;

    const initialCharacter = trimmedInput[currentPointerIndex];
    if (initialCharacter === '+' || initialCharacter === '-') {
        currentPointerIndex++;
    }

    while (currentPointerIndex < inputLength && trimmedInput[currentPointerIndex] >= '0' && trimmedInput[currentPointerIndex] <= '9') {
        hasSeenAnyDigit = true;
        currentPointerIndex++;
    }

    if (currentPointerIndex < inputLength && trimmedInput[currentPointerIndex] === '.') {
        hasSeenDecimalPoint = true;
        currentPointerIndex++;
        while (currentPointerIndex < inputLength && trimmedInput[currentPointerIndex] >= '0' && trimmedInput[currentPointerIndex] <= '9') {
            hasSeenAnyDigit = true;
            currentPointerIndex++;
        }
    }

    if (!hasSeenAnyDigit) {
        return false;
    }

    if (currentPointerIndex < inputLength && (trimmedInput[currentPointerIndex] === 'e' || trimmedInput[currentPointerIndex] === 'E')) {
        hasSeenExponentMarker = true;
        currentPointerIndex++;

        const exponentSignCharacter = trimmedInput[currentPointerIndex];
        if (exponentSignCharacter === '+' || exponentSignCharacter === '-') {
            currentPointerIndex++;
        }

        let hasSeenExponentDigits = false;
        while (currentPointerIndex < inputLength && trimmedInput[currentPointerIndex] >= '0' && trimmedInput[currentPointerIndex] <= '9') {
            hasSeenExponentDigits = true;
            currentPointerIndex++;
        }

        if (!hasSeenExponentDigits) {
            return false;
        }
    }

    return currentPointerIndex === inputLength;
};
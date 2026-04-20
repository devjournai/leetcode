/**
 * Nth Digit
 * Time Complexity: O(log n)
 * Space Complexity: O(log n)
*/
var findNthDigit = function (n) {
    let digitLength = 1;
    let numbersCount = 9;
    let baseNumber = 1;

    while (n > digitLength * numbersCount) {
        n -= digitLength * numbersCount;
        digitLength++;
        numbersCount *= 10;
        baseNumber *= 10;
    }

    let offsetInBlock = Math.floor((n - 1) / digitLength);

    let targetNumber = baseNumber + offsetInBlock;

    let digitPositionInNumber = (n - 1) % digitLength;

    let targetNumberString = String(targetNumber);

    let digitCharacter = targetNumberString[digitPositionInNumber];

    return +digitCharacter;
};
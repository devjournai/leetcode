/**
 * Integer Replacement
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var integerReplacement = function (n) {
    let currentNumber = n;
    let operationCounter = 0;

    while (currentNumber !== 1) {
        if (currentNumber % 2 === 0) {
            currentNumber /= 2;
        } else {
            if (currentNumber === 3) {
                currentNumber -= 1;
            } else if ((currentNumber + 1) % 4 === 0) {
                currentNumber += 1;
            } else {
                currentNumber -= 1;
            }
        }
        operationCounter++;
    }

    return operationCounter;
};
/**
 * Factorial Trailing Zeroes
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
*/
var trailingZeroes = function (n) {
    let accumulatedZeroes = 0;
    let currentNumberForCalculation = n;

    while (currentNumberForCalculation >= 5) {
        currentNumberForCalculation = Math.floor(currentNumberForCalculation / 5);
        accumulatedZeroes += currentNumberForCalculation;
    }

    return accumulatedZeroes;
};